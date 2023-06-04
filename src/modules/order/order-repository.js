const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class OrderRepository extends BaseRepository {
    constructor(client) {
        super(client);
        this.client = client;
        this.table = 'order';
    }

    async create(data) {
        const query = this.client(this.table).insert(data);
        return await this._executeQuery(query, arguments);
    }

    async find(filter, fields = '*') {
        const query = this.client(this.table).select(fields).where(filter);
        return await this._executeQuery(query, arguments);
    }

    async remove(data) {
        const query = this.client(this.table).where(data).delete();
        return await this._executeQuery(query, arguments);
    }
}

module.exports = new OrderRepository(dbClient);
