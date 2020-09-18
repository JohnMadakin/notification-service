import { createLogger, transports, format } from 'winston';
import { environment } from '../config';

const logLevel = environment === 'development' ? 'debug' : 'warn';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV !== 'test') {
  logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;
