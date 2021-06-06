import { bootstrapFromConfig } from './from-config';

export const bootstrapFromDefault = (): void => {
  bootstrapFromConfig({
    channels: {
      'console': {
        driver: 'winston-preset',
        level: 'info',
        presetFormat: 'json',
        sink: {
          type: 'console',
        },
      },
    },
    default: 'console',
  });
};
