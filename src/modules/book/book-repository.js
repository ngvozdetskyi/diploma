const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class BookRepository extends BaseRepository {
  constructor(client) {
    super(client);
    this.client = client;
    this.table = 'book';
  }

  async create(data, transaction) {
    const query = this.client(this.table).insert(data);
    return await this._executeQuery(query, transaction);
  }

  async doesBookExist(data) {
    const query = this.client(this.table).select('*');

    for (const field in data) {
      query.orWhere({ [field]: data[field] });
    }

    const books = await this._executeQuery(query);

    return Boolean(books.length);
  }

  async find(filter, fields = '*', options, transaction) {
    const query = this.client(this.table).select(fields).where(filter);
    this.applyOptions(query, options);
    return await this._executeQuery(query, transaction);
  }

  async update(filter, data, transaction) {
    const query = this.client(this.table).update(data).where(filter);
    return await this._executeQuery(query, transaction);
  }

  async remove(data, transaction) {
    const query = this.client(this.table).where(data).delete();
    return await this._executeQuery(query, transaction);
  }
}

module.exports = new BookRepository(dbClient);
