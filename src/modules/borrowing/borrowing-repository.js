const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class BorrowingRepository extends BaseRepository {
    constructor(client) {
        super(client);
        this.client = client;
        this.table = 'borrowing';
    }

    create(data) {
        const query = this.client(this.table).insert(data);
        return this._executeQuery(query, arguments);
    }

    async find(filter, fields = '*') {
        const query = this.client(this.table).select(fields).where(filter);
        return this._executeQuery(query, arguments);
    }

    remove(data) {
        const query = this.client(this.table).where(data).delete();
        return this._executeQuery(query, arguments);
    }
}

module.exports = new BorrowingRepository(dbClient);
