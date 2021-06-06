import { bootstrapFromConfig } from './from-config';
import { LoggerConfig } from '../types';

export const bootstrapFromFile = (configFilePath: string): void => {
  const loggingConfig: LoggerConfig = require(configFilePath).default;
  bootstrapFromConfig(loggingConfig);
};
