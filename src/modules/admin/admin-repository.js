const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class AdminRepository extends BaseRepository {
    constructor(client) {
        super(client);
        this.client = client;
        this.table = 'admin';
    }

    find(filter, fields = '*') {
        const query = this.client(this.table).select(fields).where(filter);
        return this._executeQuery(query, arguments);
    }
}

module.exports = new AdminRepository(dbClient);
