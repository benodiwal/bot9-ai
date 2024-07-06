import express, { Express } from 'express';
import cors from 'cors';
import getEnvVar from 'env/index';
import logger from 'middlewares/logger.middleware';

class Server {
    #engine: Express;
    
    constructor() {
        this.#engine = express();
    }

    #registerMiddlwares() {
      this.#engine.use(logger);
      this.#engine.use(express.json());
      this.#engine.use(cors());
    }

    #registerHandlers() {}

    start() {
        this.#registerMiddlwares();
        this.#registerHandlers();
        this.#engine.listen(parseInt(getEnvVar('PORT')), () => {
            console.log(`\nServer listening on ${getEnvVar("PORT")}`);
        });
    }
}

export default Server;
