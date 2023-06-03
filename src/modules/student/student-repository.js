const BaseRepository = require('../common/common-repository');
const dbClient = require('../../db/postgres/client');

class StudentRepository extends BaseRepository {
    constructor(client) {
        super(client);
        this.client = client;
        this.table = 'student';
    }

    create(data) {
        const query = this.client(this.table).insert(data);
        return this._executeQuery(query, arguments);
    }

    async doesStudentExist(data) {
        const query = this.client(this.table).select('*');

        for (const field in data) {
            query.orWhere({ [field]: data[field] });
        }

        const students = await this._executeQuery(query, arguments);

        return Boolean(students.length);
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

module.exports = new StudentRepository(dbClient);
