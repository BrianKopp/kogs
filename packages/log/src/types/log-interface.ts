export interface ILogger {
  error: (error: any, message: string, meta?: any) => void;
  warn: (message: string, meta?: any) => void;
  info: (message: string, meta?: any) => void;
  verbose: (message: string, meta?: any) => void;
  debug: (message: string, meta?: any) => void;

  close: () => Promise<void>;
}
