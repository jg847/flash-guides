import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'node:crypto'

const MAX_AVATAR_BYTES = 2 * 1024 * 1024
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export type AvatarMimeType = (typeof ALLOWED_MIME_TYPES)[number]

export function getAvatarValidationMessage(): string {
  return 'Image must be JPEG, PNG, or WebP under 2 MB'
}

function buildPublicUrl(key: string): string {
  const endpoint = (process.env['S3_ENDPOINT'] ?? '').replace(/\/$/, '')
  const bucket = process.env['S3_BUCKET'] ?? ''
  if (!endpoint || !bucket) {
    throw new Error('S3 storage is not configured')
  }

  return `${endpoint}/${bucket}/${key}`
}

function getBucketName(): string {
  const bucket = process.env['S3_BUCKET']
  if (!bucket) {
    throw new Error('S3 storage is not configured')
  }

  return bucket
}

function getS3Client(): S3Client {
  const endpoint = process.env['S3_ENDPOINT']
  const accessKeyId = process.env['S3_ACCESS_KEY']
  const secretAccessKey = process.env['S3_SECRET_KEY']

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('S3 storage is not configured')
  }

  return new S3Client({
    region: 'us-east-1',
    endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

function detectMimeType(buffer: Uint8Array): AvatarMimeType | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg'
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png'
  }

  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return 'image/webp'
  }

  return null
}

function extensionForMimeType(mimeType: AvatarMimeType): string {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
  }
}

export async function validateAvatarFile(
  file: File,
): Promise<{ buffer: Buffer; mimeType: AvatarMimeType }> {
  if (!ALLOWED_MIME_TYPES.includes(file.type as AvatarMimeType) || file.size > MAX_AVATAR_BYTES) {
    throw new Error(getAvatarValidationMessage())
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const detectedType = detectMimeType(buffer)

  if (!detectedType || detectedType !== file.type) {
    throw new Error(getAvatarValidationMessage())
  }

  return {
    buffer,
    mimeType: detectedType,
  }
}

export async function uploadAvatar(
  buffer: Buffer,
  mimeType: AvatarMimeType,
  userId: string,
): Promise<string> {
  const bucket = getBucketName()

  const key = `avatars/${userId}/${randomUUID()}.${extensionForMimeType(mimeType)}`
  const client = getS3Client()

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )

  return buildPublicUrl(key)
}

function extractKeyFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const bucket = getBucketName()
    const prefix = `/${bucket}/`
    if (!parsed.pathname.startsWith(prefix)) {
      return null
    }

    return parsed.pathname.slice(prefix.length)
  } catch {
    return null
  }
}

export async function uploadExportArchive(
  buffer: Buffer,
  userId: string,
): Promise<{ downloadUrl: string; expiresAt: string; objectKey: string }> {
  if (process.env['PLAYWRIGHT_TEST'] === '1') {
    return {
      downloadUrl: `data:application/zip;base64,${buffer.toString('base64')}`,
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
      objectKey: 'inline-playwright-export',
    }
  }

  const bucket = getBucketName()
  const client = getS3Client()
  const objectKey = `exports/${userId}/${randomUUID()}.zip`
  const expiresInSeconds = 60

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: buffer,
      ContentType: 'application/zip',
      CacheControl: 'private, max-age=60',
    }),
  )

  const downloadUrl = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: bucket,
      Key: objectKey,
    }),
    { expiresIn: expiresInSeconds },
  )

  return {
    downloadUrl,
    expiresAt: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
    objectKey,
  }
}

export async function deleteStoredObjectByUrl(url: string | null | undefined): Promise<void> {
  if (!url) {
    return
  }

  const key = extractKeyFromUrl(url)
  if (!key) {
    return
  }

  const client = getS3Client()
  await client.send(
    new DeleteObjectCommand({
      Bucket: getBucketName(),
      Key: key,
    }),
  )
}

export async function deleteStoredObjectsByPrefix(prefix: string): Promise<void> {
  const client = getS3Client()
  const bucket = getBucketName()

  const list = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    }),
  )

  for (const object of list.Contents ?? []) {
    if (!object.Key) {
      continue
    }

    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: object.Key,
      }),
    )
  }
}
