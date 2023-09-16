let logger: Logger

export class Logger {
  isActive: boolean
  constructor(isActive: boolean) {
    this.isActive = isActive
  }

  log(where: string, message: string, data?: any): void {
    if (!this.isActive) return
    console.info(where, message, data)
  }

  error(where: string, message: string, data?: any): void {
    if (!this.isActive) return
    console.error(where, message, data)
  }
}

export function getLogger(): Logger {
  if (logger) return logger
  return (logger = new Logger(true))
}
