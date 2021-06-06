import { createLogger } from 'winston';
import { LoggerConfig, ILogger } from '../types';
import { registerLogger } from '../log.dependency';
import { WinstonLogger, MultiLogger, winstonConfigFromPreset } from '../providers';
import { logLevelScrubber } from '../utils';

export const bootstrapFromConfig = (config: LoggerConfig): void => {
  const channelNames = Object.keys(config.channels);
  const channelLoggers: {[key: string]: ILogger} = {};
  for (const channelName of channelNames) {
    const channelConfig = config.channels[channelName];
    if (channelConfig.driver === 'winston-preset') {
      channelLoggers[channelName] = new WinstonLogger(createLogger(winstonConfigFromPreset(channelConfig)));
    } else if (channelConfig.driver === 'winston') {
      channelLoggers[channelName] = new WinstonLogger(createLogger({
        ...channelConfig.winstonConfig,
        level: logLevelScrubber(channelConfig.winstonConfig.level),
      }));
    } else {
      throw new Error('unrecognized logging driver');
    }

    registerLogger(channelLoggers[channelName], channelName);
  }

  // register the default logger
  if (typeof config.default === 'string') {
    if (!channelLoggers[config.default]) {
      throw new Error('default logging driver doesnt match any channel');
    }
    registerLogger(channelLoggers[config.default]);
    return;
  }

  if (!Array.isArray(config.default) || config.default.length === 0) {
    throw new Error('logging driver must be string or non-empty array');
  }

  // default logger is array
  const defaultChannelNames = config.default.filter((value, index, self) => {
    return self.indexOf(value) === index; // restrict to unique channels, e.g. deduplicate loggingConfig.default = ['console', 'console'];
  });
  const defaultLoggers: ILogger[] = [];
  for (const channelName of defaultChannelNames) {
    if (!channelLoggers[channelName]) {
      throw new Error('could not find logging channel ' + channelName);
    }
    defaultLoggers.push(channelLoggers[channelName]);
  }
  const multiLogger = new MultiLogger(defaultLoggers);
  registerLogger(multiLogger);
  return;
};
