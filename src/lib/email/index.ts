import nodemailer from 'nodemailer'
import { getAppUrl } from '@/lib/utils/app-url'

function createTransport() {
  return nodemailer.createTransport({
    host: process.env['SMTP_HOST'] ?? 'localhost',
    port: parseInt(process.env['SMTP_PORT'] ?? '1025', 10),
    auth: process.env['SMTP_USER']
      ? {
          user: process.env['SMTP_USER'],
          pass: process.env['SMTP_PASS'] ?? '',
        }
      : undefined,
    secure: false,
  })
}

const FROM = process.env['SMTP_FROM'] ?? 'noreply@flashguides.local'

/**
 * Send an email verification link to a newly registered user.
 */
export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const url = `${getAppUrl()}/verify-email?token=${token}`
  const transport = createTransport()

  await transport.sendMail({
    from: FROM,
    to: email,
    subject: 'Verify your FlashGuides email',
    text: `Click the link to verify your email address:\n\n${url}\n\nThis link expires in 24 hours.`,
    html: `<p>Click the link below to verify your email address:</p>
<p><a href="${url}">${url}</a></p>
<p>This link expires in 24 hours.</p>`,
  })
}

/**
 * Send a password reset link.
 */
export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const url = `${getAppUrl()}/reset-password?token=${token}`
  const transport = createTransport()

  await transport.sendMail({
    from: FROM,
    to: email,
    subject: 'Reset your FlashGuides password',
    text: `Click the link to reset your password:\n\n${url}\n\nThis link expires in 1 hour.`,
    html: `<p>Click the link below to reset your password:</p>
<p><a href="${url}">${url}</a></p>
<p>This link expires in 1 hour. If you did not request this, ignore this email.</p>`,
  })
}

/**
 * Send an email change verification link.
 */
export async function sendEmailChangeVerification(email: string, token: string): Promise<void> {
  const url = `${getAppUrl()}/api/account/verify-email-change?token=${token}`
  const transport = createTransport()

  await transport.sendMail({
    from: FROM,
    to: email,
    subject: 'Confirm your new FlashGuides email',
    text: `Click the link to confirm your new email address:\n\n${url}\n\nThis link expires in 24 hours.`,
    html: `<p>Click the link below to confirm your new email address:</p>
<p><a href="${url}">${url}</a></p>
<p>This link expires in 24 hours.</p>`,
  })
}
