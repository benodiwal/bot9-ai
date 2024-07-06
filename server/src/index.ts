import Server from 'apps/server';
import { parseEnv } from 'env/index';
import Database from 'apps/database';

parseEnv();

const server = new Server();
const database = new Database();

database.init()
.then(() => {
  server.start();
})
.catch((error) => {
  console.error('Unable to connect to database: ', error);
});
