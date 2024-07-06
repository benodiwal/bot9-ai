import { Sequelize } from '@sequelize/core';
import { Conversation } from 'models/conversation.model';

class Database {
  #sequelize: Sequelize;

  constructor() {
    this.#sequelize = new Sequelize({
      dialect: 'sqlite',
      database: 'bot9-ai',
      storage: 'sequelize.sqlite',
      models: [Conversation],
    });
  }

  init() {
    return this.#sequelize.authenticate();
  }
}

export default Database;
