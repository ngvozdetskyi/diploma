const dbClient = require('../../db/postgres/client');

class BaseRepository {
    constructor() {
    }

    create() {
        throw new Error('Should implement custom logic');
    }

    doesStudentExist() {
        throw new Error('Should implement custom logic');
    }

    find() {
        throw new Error('Should implement custom logic');
    }

    update() {
        throw new Error('Should implement custom logic');
    }

    remove() {
        throw new Error('Should implement custom logic');
    }
}

class StudentRepository extends BaseRepository {
    constructor(client) {
        super();
        this.client = client;
        this.table = 'student';
    }

    create(data) {
        return this.client(this.table).insert(data);
    }

    async doesStudentExist(data) {
        const query = this.client(this.table).select('*');

        for (const field in data) {
            query.orWhere({ [field]: data[field] });
        }

        const students = await query;

        return Boolean(students.length);
    }

    find(filter, fields = '*') {
        return this.client(this.table).select(fields).where(filter);
    }

    update(filter, data) {
        return this.client(this.table).update(data).where(filter);
    }

    remove(data) {
        return this.client(this.table).where(data).delete();
    }
}

module.exports = new StudentRepository(dbClient);
