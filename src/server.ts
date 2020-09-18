import Logger from './helpers/Logger';
import { port } from './config';
import app from './app';
console.log({ port });
app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on('error', onError);

/*
  @description handle specific listen errors with friendly messages
  */
function onError(error: Error) {
  switch (error.name) {
    case 'EACCES':
      Logger.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
