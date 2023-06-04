const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class BorrowingRepository extends BaseRepository {
  constructor(client) {
    super(client);
    this.client = client;
    this.table = 'borrowing';
  }

  async create(data) {
    const query = this.client(this.table).insert(data);
    return await this._executeQuery(query, arguments);
  }

  async find(filter, fields = '*') {
    const query = this.client(this.table).select(fields).where(filter);
    return this._executeQuery(query, arguments);
  }

  async remove(data) {
    const query = this.client(this.table).where(data).delete();
    return await this._executeQuery(query, arguments);
  }
}

module.exports = new BorrowingRepository(dbClient);
