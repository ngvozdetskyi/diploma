const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class BorrowingRepository extends BaseRepository {
  constructor(client) {
    super(client);
    this.client = client;
    this.table = 'borrowing';
  }

  async create(data, transaction) {
    const query = this.client(this.table).insert(data);
    return await this._executeQuery(query, transaction);
  }

  async find(filter, fields = '*', options, transaction) {
    const query = this.client(this.table).select(fields).where(filter);
    this.applyOptions(query, options);
    return await this._executeQuery(query, transaction);
  }

  async remove(data, transaction) {
    const query = this.client(this.table).where(data).delete();
    return await this._executeQuery(query, transaction);
  }
}

module.exports = new BorrowingRepository(dbClient);
