const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class OrderBookRepository extends BaseRepository {
  constructor(client) {
    super(client);
    this.client = client;
    this.table = 'order-book';
  }

  async create(data, transaction) {
    const query = this.client(this.table).insert(data);
    return await this._executeQuery(query, transaction);
  }

  async remove(data, transaction) {
    const query = this.client(this.table).where(data).delete();
    return await this._executeQuery(query, transaction);
  }
}

module.exports = new OrderBookRepository(dbClient);
