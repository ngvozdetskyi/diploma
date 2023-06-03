const BookModel = require('./book-model');
const bookRepository = require('./book-repository');

class BookService {
    constructor(bookRepository) {
        this.repository = bookRepository;
    }

    async create(data) {
        const doesBookExist = await this.repository.doesBookExist({ title: data.title });
        if (doesBookExist) {
            throw new Error('Book with such title already exists. Try to change the title!');
        }
        await this.repository.create(new BookModel(data));
    }

    async update(id, data) {
        const doesBookExist = await this.repository.doesBookExist({ id });
        if (!doesBookExist) {
            throw new Error(`Book[${id}] does not exist! Create new one.`);
        }
        await this.repository.update({ id }, new BookModel({ id, ...data }));
    }

    find(filter, fields) {
        return this.repository.find(filter, fields);
    }

    async findOne(filter, fields) {
        const books = await this.repository.find(filter, fields);
        if (!books.length) {
            return;
        }
        return books[0];
    }

    remove(data) {
        return this.repository.remove(data);
    }
}

module.exports = new BookService(bookRepository);