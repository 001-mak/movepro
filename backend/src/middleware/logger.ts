import config from '../config/config';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: config.node_env === 'production' ? 'info' : 'debug', // Set log level based on environment
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message} ${
        stack ? `\n${stack}` : ''
      }`;
    })
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'], // Errors will be printed to stderr
    }),
  ]
});

// Add file transports only in production
if (config.node_env === 'production') {
  logger.add(new transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }));

  logger.add(new transports.File({
    filename: 'logs/combined.log'
  }));
}

export default logger;
