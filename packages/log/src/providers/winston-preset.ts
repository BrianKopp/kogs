import { format, transports, LoggerOptions} from 'winston';
import { PresetLoggerConfig } from '../types';
import { logLevelScrubber } from '../utils';

const formatMetadata = format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label']});

export const winstonConfigFromPreset = (config: PresetLoggerConfig): LoggerOptions => {
  const lgrTransports = [];
  if (config.sink.type === 'file') {
    lgrTransports.push(new transports.File({
      filename: config.sink.path,
    }));
  }
  if (config.sink.type === 'console') {
    lgrTransports.push(new transports.Console());
  }

  const formats = [
    format.timestamp(),
    formatMetadata,
  ];

  if (config.presetFormat === 'json') {
    formats.push(format.json());
  }
  if (config.presetFormat === 'simple') {
    formats.push(format.simple());
  }
  return {
    level: logLevelScrubber(config.level),
    format: format.combine(...formats),
    transports: lgrTransports,
  }
};
