import Server from 'apps/server';
import { parseEnv } from 'env/index';

parseEnv();

const server = new Server();
server.start();
