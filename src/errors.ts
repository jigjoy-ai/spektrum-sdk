export class SpektrumError extends Error {
    constructor(
      message: string,
      public readonly status: number,
      public readonly body?: unknown
    ) {
      super(message)
      this.name = "SpektrumError"
    }
  }
  