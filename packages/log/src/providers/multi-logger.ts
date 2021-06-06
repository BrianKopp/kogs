import { ILogger } from '../types';

export class MultiLogger implements ILogger {
  constructor(private loggers: ILogger[]) {}

  error(error: Error, message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  error(error: any, message?: any|string, meta?: any) {
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
}
