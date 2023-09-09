const {
  createBook,
  removeBook,
  updateBook,
  getAllBooks,
} = require('./book-validation-schemas');
const bookController = require('./book-controller');
const { create, remove, update, getAll } = bookController;

module.exports = async function (fastify) {
  fastify.post(
    '/book',
    {
      schema: createBook,
      preHandler: [fastify.verifyToken, fastify.guard.role('admin')],
    },
    create.bind(bookController)
  );
  fastify.get(
    '/book/all',
    {
      schema: getAllBooks,
      preHandler: [fastify.verifyToken, fastify.guard.role('admin', 'student')],
    },
    getAll.bind(bookController)
  );
  fastify.delete(
    '/book',
    {
      schema: removeBook,
      preHandler: [fastify.verifyToken, fastify.guard.role('admin')],
    },
    remove.bind(bookController)
  );
  fastify.put('/book', { schema: updateBook }, update.bind(bookController));
};
