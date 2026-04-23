import type { IMCPClient } from './types'
import { MCPServiceError, MCPTimeoutError } from './types'

function isRetryable(err: unknown): boolean {
  return err instanceof MCPServiceError || err instanceof MCPTimeoutError
}

/**
 * RetryDecorator — Decorator pattern over any `IMCPClient`.
 * Retries only on `MCPServiceError` and `MCPTimeoutError` (transient failures).
 * Uses exponential backoff with random jitter.
 */
export class RetryDecorator<T, R> implements IMCPClient<T, R> {
  get toolName(): string {
    return this.client.toolName
  }

  constructor(
    private readonly client: IMCPClient<T, R>,
    private readonly maxRetries = 3,
    private readonly baseDelayMs = 300,
  ) {}

  async execute(input: T): Promise<R> {
    let lastError: unknown

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await this.client.execute(input)
      } catch (err) {
        lastError = err
        if (!isRetryable(err) || attempt === this.maxRetries - 1) {
          throw err
        }
        const jitter = this.baseDelayMs > 0 ? Math.random() * 100 : 0
        const delay = this.baseDelayMs * Math.pow(2, attempt) + jitter
        await new Promise<void>((resolve) => setTimeout(resolve, delay))
      }
    }

    // Should never reach here, but satisfies the type-checker
    throw lastError
  }
}
