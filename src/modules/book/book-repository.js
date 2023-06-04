const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class BookRepository extends BaseRepository {
  constructor(client) {
    super(client);
    this.client = client;
    this.table = 'book';
  }

  async create(data) {
    const query = this.client(this.table).insert(data);
    return await this._executeQuery(query, arguments);
  }

  async doesBookExist(data) {
    const query = this.client(this.table).select('*');

    for (const field in data) {
      query.orWhere({ [field]: data[field] });
    }

    const books = await this._executeQuery(query, arguments);

    return Boolean(books.length);
  }

  async find(filter, fields = '*') {
    const query = this.client(this.table).select(fields).where(filter);
    return await this._executeQuery(query, arguments);
  }

  async update(filter, data) {
    const query = this.client(this.table).update(data).where(filter);
    return await this._executeQuery(query, arguments);
  }

  async remove(data) {
    const query = this.client(this.table).where(data).delete();
    return await this._executeQuery(query, arguments);
  }
}

module.exports = new BookRepository(dbClient);
