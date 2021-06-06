import { LOG_LEVEL } from '../types';

export const logLevelScrubber = (level?: string): LOG_LEVEL => {
  const lower = level?.toLowerCase() ?? '';
  const allowedLevels = ['debug', 'verbose', 'info', 'warn', 'error'];
  if (!allowedLevels.includes(lower)) {
    return 'info';
  }
  return lower as LOG_LEVEL;
};
