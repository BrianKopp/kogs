import { getLoggerByName } from './log.dependency';
import { ILogger } from './types';
import { MultiLogger } from './providers';

export class LogFacade implements ILogger {
  private loggers: {[channelName: string]: ILogger }

  constructor() {
    this.loggers = {};
  }
  error(error: Error, message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  error(error: any, message?: any, meta?: any) {
    return this.getChannel().error(error, message, meta);
  }


  warn(message: string, meta?: any): void {
    return this.getChannel().warn(message, meta);
  }

  info(message: string, meta?: any): void {
    return this.getChannel().info(message, meta);
  }

  verbose(message: string, meta?: any): void {
    return this.getChannel().verbose(message, meta);
  }

  debug(message: string, meta?: any): void {
    return this.getChannel().debug(message, meta);
  }

  to(...channelNames: string[]): ILogger {
    const lookupLoggerKey = channelNames.join(',');
    if (!this.loggers[lookupLoggerKey]) {
      if (channelNames.length === 1) {
        this.loggers[lookupLoggerKey] = this.getChannel(channelNames[0]);
      } else {
        const multiLoggers = channelNames.map((cn) => this.getChannel(cn));
        this.loggers[lookupLoggerKey] = new MultiLogger(multiLoggers);
      }
    }
    return this.loggers[lookupLoggerKey];
  }

  private getChannel(channelName?: string): ILogger {
    return getLoggerByName(channelName);
  }
}
