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

    remove() {
        throw new Error('Should implement custom logic');
    }
}

class StudentRepository extends BaseRepository {
    constructor(client) {
        super();
        this.client = client;
    }

    create(data) {
        return this.client('student').insert(data);
    }

    async doesStudentExist(data) {
        const query = this.client('student').select('*');

        for (const field in data) {
            query.orWhere({ [field]: data[field] });
        }

        const students = await query;

        return Boolean(students.length);
    }

    update(filter, data) {
        return this.client('student').update(data).where(filter);
    }

    remove(data) {
        return this.client('student').where(data).delete();
    }
}

module.exports = new StudentRepository(dbClient);
