import { Logger } from 'winston';
import { ILogger } from '../types';

export class WinstonLogger implements ILogger {
  constructor(private wLogger: Logger) {}
  error(error: any, message: string, meta?: any): void {
    this.wLogger.error(message, {
      ...meta || {},
      error,
    });
  }

  warn(message: string, meta?: any): void {
    this.wLogger.warn(message, meta);
  }
  info(message: string, meta?: any): void {
    this.wLogger.info(message, meta);
  }
  verbose(message: string, meta?: any): void {
    this.wLogger.verbose(message, meta);
  }

  debug(message: string, meta?: any): void {
    this.wLogger.debug(message, meta);
  }

  close(): Promise<void> {
    this.wLogger.close();
    return Promise.resolve(); // TODO double check this
  }

}
