import { Logger } from 'winston';
import { ILogger } from '../types';

export class WinstonLogger implements ILogger {
  constructor(private wLogger: Logger) {}

  error(error: Error, message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  error(error: any, message?: any, meta?: any) {
    if (meta) {
      this.wLogger.error(message, {
        ...meta || {},
        error,
      });
      return;
    }

    if (typeof message === 'string' && error instanceof Error) {
      const { message:errMsg, ...rest } = error;
      this.wLogger.error(message, {
        errorMessage: error.toString(),
        stack: error.stack,
        ...rest,
      });
      return;
    }

    if (typeof message === 'string' && !(error instanceof Error)) {
      this.wLogger.error(message, { error });
      return;
    }

    if (typeof message === 'string' && typeof error === 'string') {
      this.wLogger.error(error, { message });
      return;
    }

    if (typeof error === 'string' && message) {
      this.wLogger.error(error, message);
      return;
    }

    this.wLogger.error(error);
  }

  warn(message: string, meta?: any): void {
    if (meta) {
      this.wLogger.warn(message, meta);
      return;
    }
    this.wLogger.warn(message);
  }
  info(message: string, meta?: any): void {
    if (meta) {
      this.wLogger.info(message, meta);
      return;
    }
    this.wLogger.info(message);
  }
  verbose(message: string, meta?: any): void {
    if (meta) {
      this.wLogger.verbose(message, meta);
      return;
    }
    this.wLogger.verbose(message);
  }

  debug(message: string, meta?: any): void {
    if (meta) {
      this.wLogger.debug(message, meta);
      return;
    }
    this.wLogger.debug(message);
  }
}
