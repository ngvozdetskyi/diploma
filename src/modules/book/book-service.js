const BookModel = require('./book-model');
const bookRepository = require('./book-repository');

class BookService {
  constructor(bookRepository) {
    this.repository = bookRepository;
  }

  async create(data) {
    const doesBookExist = await this.repository.doesBookExist({
      title: data.title,
    });
    if (doesBookExist) {
      throw new Error(
        'Book with such title already exists. Try to change the title!'
      );
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

  getAll(params = {}) {
    const {
      pageSize = 25,
      pageNumber,
      title,
      author,
      issueDate: issue_date,
    } = params;
    const options = {};
    const filter = {};

    if (title) {
      filter.title = title;
    }

    if (author) {
      filter.author = author;
    }

    if (issue_date) {
      filter.issue_date = issue_date;
    }

    if (pageNumber) {
      options.limit = pageSize;
      options.offset = (pageNumber - 1) * pageSize;
    }
    return this.repository.find(filter, '*', options);
  }

  remove(id) {
    return this.repository.remove({ id });
  }
}

module.exports = new BookService(bookRepository);
