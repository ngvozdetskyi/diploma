const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class BookRepository extends BaseRepository {
    constructor(client) {
        super(client);
        this.client = client;
        this.table = 'book';
    }

    create(data) {
        const query = this.client(this.table).insert(data);
        return this._executeQuery(query, arguments);
    }

    async doesBookExist(data) {
        const query = this.client(this.table).select('*');

        for (const field in data) {
            query.orWhere({ [field]: data[field] });
        }

        const books = await this._executeQuery(query, arguments);

        return Boolean(books.length);
    }

    find(filter, fields = '*') {
        const query = this.client(this.table).select(fields).where(filter);
        return this._executeQuery(query, arguments);
    }

    update(filter, data) {
        const query = this.client(this.table).update(data).where(filter);
        return this._executeQuery(query, arguments);
    }

    remove(data) {
        const query = this.client(this.table).where(data).delete();
        return this._executeQuery(query, arguments);
    }
}

module.exports = new BookRepository(dbClient);
