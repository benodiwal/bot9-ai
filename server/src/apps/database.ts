import { Sequelize } from '@sequelize/core'
import { SqliteDialect } from '@sequelize/sqlite3';

class Database {
    #sequelize: Sequelize;

    constructor() {
        this.#sequelize = new Sequelize({
            dialect: SqliteDialect,
            storage: 'sequelize.sqlite'
        });
    }

    init() {
        return this.#sequelize.authenticate();
    }
}

export default Database;
