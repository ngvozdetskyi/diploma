const { createOrder, removeOrder } = require('./order-validation-schemas');
const orderController = require('./order-controller');

module.exports = async function (fastify) {
  fastify.post(
    '/order',
    {
      schema: createOrder,
      preHandler: [fastify.verifyToken, fastify.guard.role('student')],
    },
    orderController.create.bind(orderController)
  );
  fastify.delete(
    '/order',
    {
      schema: removeOrder,
      preHandler: [fastify.verifyToken, fastify.guard.role('student')],
    },
    orderController.remove.bind(orderController)
  );
};
