export interface ErrorCaptureContext {
  source: 'api' | 'global-error'
  requestId?: string
  digest?: string
  metadata?: Record<string, unknown>
}

type SentryModule = {
  captureException: (error: Error) => void
  withScope?: (
    callback: (scope: {
      setTag: (key: string, value: string) => void
      setExtra: (key: string, value: unknown) => void
    }) => void,
  ) => void
}

let sentryModulePromise: Promise<SentryModule | null> | undefined

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }

  return new Error(typeof error === 'string' ? error : 'Unknown error')
}

async function loadSentryModule(): Promise<SentryModule | null> {
  if (sentryModulePromise) {
    return sentryModulePromise
  }

  sentryModulePromise = (async () => {
    const moduleName = '@sentry/nextjs'

    try {
      return (await import(moduleName)) as SentryModule
    } catch {
      return null
    }
  })()

  return sentryModulePromise
}

export async function captureError(error: unknown, context: ErrorCaptureContext): Promise<void> {
  const sentry = await loadSentryModule()
  if (!sentry) {
    return
  }

  const normalizedError = normalizeError(error)

  if (sentry.withScope) {
    sentry.withScope((scope) => {
      scope.setTag('source', context.source)

      if (context.requestId) {
        scope.setTag('requestId', context.requestId)
      }

      if (context.digest) {
        scope.setTag('digest', context.digest)
      }

      for (const [key, value] of Object.entries(context.metadata ?? {})) {
        scope.setExtra(key, value)
      }

      sentry.captureException(normalizedError)
    })
    return
  }

  sentry.captureException(normalizedError)
}
