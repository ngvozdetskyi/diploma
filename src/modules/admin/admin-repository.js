const dbClient = require('../../db/postgres/client');

class BaseRepository {
    constructor() {
    }

    find() {
        throw new Error('Should implement custom logic');
    }
}

class AdminRepository extends BaseRepository {
    constructor(client) {
        super();
        this.client = client;
        this.table = 'admin';
    }

    find(filter, fields = '*') {
        return this.client(this.table).select(fields).where(filter);
    }
}

module.exports = new AdminRepository(dbClient);
