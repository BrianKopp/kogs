import { ILogger } from '../types';

export class MultiLogger implements ILogger {
  constructor(private loggers: ILogger[]) {}

  error(error: any, message: string, meta?: any): void {
    for (const lgr of this.loggers) {
      lgr.error(error, message, meta);
    }
  }

  warn(message: string, meta?: any): void {
    for (const lgr of this.loggers) {
      lgr.warn(message, meta);
    }
  }

  info(message: string, meta?: any): void {
    for (const lgr of this.loggers) {
      lgr.info(message, meta);
    }
  }

  verbose(message: string, meta?: any): void {
    for (const lgr of this.loggers) {
      lgr.verbose(message, meta);
    }
  }

  debug(message: string, meta?: any): void {
    for (const lgr of this.loggers) {
      lgr.debug(message, meta);
    }
  }

  async close(): Promise<void> {
    for (const lgr of this.loggers) {
      await lgr.close();
    }
  }
}
