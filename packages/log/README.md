# Log

`@kogs/log` is a logging component to provide centralized application logs
using the `winston` logging library by default. You can create different
logging channels, e.g. a file logger and a console logger.

## Quick Start

```sh
npm install @kogs/log --save
```

```ts
// index.ts
import { bootstrapFromDefault } from '@kogs/log';
// defaults to using a 'simple' winston console info-level logger.
bootstrapFromDefault();
```

```ts
// app.ts
import Log from '@kogs/log';

Log.debug('some debug message');
Log.verbose('some verbose message');
Log.info('some message');
Log.warn('warning level', { somePropToLog: 'foobar' });
Log.error('error level');

try {
  throw new Error('zoinks!');
} catch (err) {
  Log.error(err, 'error while doing something', { extra: 'data to log' });
}
```
