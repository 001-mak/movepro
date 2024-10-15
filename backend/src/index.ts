import app from './app';
import config from './config/config';

const server = app.listen(Number(config.server.port), () => {
  console.log('info', `Server is running on Port: ${config.server.port}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.info('Closing server.');
  server.close((err) => {
    console.info('Server closed.');
    process.exit(err ? 1 : 0);
  });
});
