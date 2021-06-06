export * from './types';
export * from './bootstrap';
export * from './providers';
export * from './log.dependency';

// export the facade as a singleton
import { LogFacade } from './log.facade';
const Log = new LogFacade();
export default Log;
