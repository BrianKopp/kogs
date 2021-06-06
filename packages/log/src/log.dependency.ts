import { container } from 'tsyringe';
import { ILogger } from './types';

export const LOGGER_DEPENDENCY_TOKEN = 'Logger';

export const registerLogger = (lgr: ILogger, channelName?: string) => {
  container.register<ILogger>(`${LOGGER_DEPENDENCY_TOKEN}_${channelName || 'default'}`, { useValue: lgr });
};

export const getLoggerByName = (channelName?: string): ILogger => {
  return container.resolve<ILogger>(`${LOGGER_DEPENDENCY_TOKEN}_${channelName || 'default'}`);
};
