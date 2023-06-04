const { create, remove } = require('./order-validation-schemas');
const orderController = require('./order-controller');

module.exports = async function (fastify) {
  fastify.post(
    '/order/create',
    {
      schema: create,
      preHandler: [fastify.verifyToken, fastify.guard.role(['student'])],
    },
    orderController.create.bind(orderController)
  );
  fastify.post(
    '/order/remove',
    {
      schema: remove,
      preHandler: [fastify.verifyToken, fastify.guard.role(['student'])],
    },
    orderController.remove.bind(orderController)
  );
};
