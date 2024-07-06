import Server from 'apps/server';
import { parseEnv } from 'env/index';
import Database from 'apps/database';

parseEnv();

const database = new Database();
const server = new Server(database);

server.start();
