const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class AdminRepository extends BaseRepository {
  constructor(client) {
    super(client);
    this.client = client;
    this.table = 'admin';
  }

  async find(filter, fields = '*', options, transaction) {
    const query = this.client(this.table).select(fields).where(filter);
    this.applyOptions(query, options);
    return await this._executeQuery(query, transaction);
  }
}

module.exports = new AdminRepository(dbClient);
