// ── Core interface ────────────────────────────────────────────────────────────

export interface IMCPClient<TInput, TOutput> {
  readonly toolName: string
  execute(input: TInput): Promise<TOutput>
}

// ── Error hierarchy ───────────────────────────────────────────────────────────

export class MCPError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MCPError'
  }
}

/** HTTP 4xx response from a fetch. Non-retryable. */
export class MCPFetchError extends MCPError {
  constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message)
    this.name = 'MCPFetchError'
  }
}

/** Network timeout or AbortController signal fired. Retryable. */
export class MCPTimeoutError extends MCPError {
  constructor(message: string) {
    super(message)
    this.name = 'MCPTimeoutError'
  }
}

/** HTTP 5xx or unexpected service failure. Retryable. */
export class MCPServiceError extends MCPError {
  constructor(message: string) {
    super(message)
    this.name = 'MCPServiceError'
  }
}

/** HTTP 429 rate-limit from a third-party API. Non-retryable. */
export class MCPRateLimitError extends MCPError {
  constructor(message: string) {
    super(message)
    this.name = 'MCPRateLimitError'
  }
}

/** YouTube video has captions disabled or unavailable. Non-retryable. */
export class MCPTranscriptUnavailableError extends MCPError {
  constructor(message: string) {
    super(message)
    this.name = 'MCPTranscriptUnavailableError'
  }
}
