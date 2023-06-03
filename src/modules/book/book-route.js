const { createBook, removeBook, updateBook } = require('./book-validation-schemas');
const bookController = require('./book-controller');
const { create, remove, update } = bookController;

module.exports = async function (fastify) {
    fastify.post('/book/create', { schema: createBook, preHandler: [fastify.verifyToken, fastify.guard.role(['admin'])] }, create.bind(bookController));
    fastify.post('/book/remove', { schema: removeBook, preHandler: [fastify.verifyToken, fastify.guard.role(['admin'])] }, remove.bind(bookController));
    fastify.post('/book/update', { schema: updateBook }, update.bind(bookController));
};