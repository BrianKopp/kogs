import { LoggerOptions } from 'winston';
import { LOG_LEVEL } from './log-level';

export interface ConsoleSinkConfig {
  type: 'console';
}

export interface FileSinkConfig {
  type: 'file';
  path: string;
}

export interface PresetLoggerConfig {
  driver: 'winston-preset';
  level: LOG_LEVEL;
  presetFormat: 'json' | 'simple';
  sink: FileSinkConfig | ConsoleSinkConfig;
}

export interface WinstonLoggerConfig {
  driver: 'winston';
  winstonConfig: LoggerOptions;
}

export interface LoggerConfig {
  default: string | string[];
  channels: {[key: string]: WinstonLoggerConfig | PresetLoggerConfig }
}
