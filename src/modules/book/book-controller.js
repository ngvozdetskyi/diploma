const bookService = require('./book-service');

class BookController {
  constructor(bookService) {
    this.service = bookService;
  }

  async create(req, res) {
    try {
      await this.service.create(req.body);
      res.status(201).send('Book has been successfully created.');
    } catch (err) {
      console.error(`Error during API call[${req.url}] due ${err}`);
      res.status(400).send(err.message);
    }
  }

  async update(req, res) {
    try {
      await this.service.update(req.query.id, req.body);
      res.status(200).send('Book has been successfully updated.');
    } catch (err) {
      console.error(`Error during API call[${req.url}] due ${err}`);
      res.status(400).send(err.message);
    }
  }

  async getAll(req, res) {
    try {
      const books = await this.service.getAll(req.query);
      res.status(200).send(books);
    } catch (err) {
      console.error(`Error during API call[${req.url}] due ${err}`);
      res.status(400).send(err.message);
    }
  }

  async remove(req, res) {
    try {
      await this.service.remove(req.query.id);
      res.status(200).send('Book has been successfully removed.');
    } catch (err) {
      console.error(`Error during API call[${req.url}] due ${err}`);
      res.status(400).send(err.message);
    }
  }
}

module.exports = new BookController(bookService);
