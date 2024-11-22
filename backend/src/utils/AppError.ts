export class AppError extends Error {
  public readonly status: number
  public readonly code: string

  constructor(message: string, status: number, code: string) {
    super(message)
    this.status = status
    this.code = code

    // Define a propriedade Error.captureStackTrace para manter o rastreamento do erro
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
