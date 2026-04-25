import { AsyncLocalStorage } from 'node:async_hooks'
import pino from 'pino'
import type { Logger } from 'pino'

const LOG_LEVEL = process.env['LOG_LEVEL'] ?? 'info'
const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development'

const transport = IS_DEVELOPMENT
  ? pino.transport({
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    })
  : undefined

const baseLogger = pino(
  {
    level: LOG_LEVEL,
    redact: {
      paths: [
        'email',
        'password',
        'passwordHash',
        'token',
        'authorization',
        'cookie',
        'set-cookie',
        'headers.authorization',
        'headers.cookie',
      ],
      censor: '[Redacted]',
    },
  },
  transport,
)

const requestLoggerStorage = new AsyncLocalStorage<Logger>()

export function createLogger(requestId?: string) {
  return requestId ? baseLogger.child({ requestId }) : baseLogger
}

export function getLogger(): Logger {
  return requestLoggerStorage.getStore() ?? baseLogger
}

export function withRequestLogger<T>(requestId: string, callback: () => T): T {
  return requestLoggerStorage.run(createLogger(requestId), callback)
}
