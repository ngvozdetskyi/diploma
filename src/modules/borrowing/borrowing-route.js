const { borrow, acceptReturn } = require('./borrowing-validation-schemas');
const borrowingController = require('./borrowing-controller');

module.exports = async function (fastify) {
    fastify.post('/borrowing/approve', { schema: borrow, preHandler: [fastify.verifyToken, fastify.guard.role(['admin'])] }, borrowingController.approveBorrowing.bind(borrowingController));
    fastify.post('/borrowing/return', { schema: acceptReturn, preHandler: [fastify.verifyToken, fastify.guard.role(['admin'])] }, borrowingController.acceptReturn.bind(borrowingController));
};