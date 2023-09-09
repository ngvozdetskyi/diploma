const { login } = require('./admin-validation-schemas');
const adminController = require('./admin-controller');

module.exports = async function (fastify) {
  fastify.post(
    '/admin/login',
    { schema: login },
    adminController.login.bind(adminController)
  );
  fastify.post(
    '/admin/logout',
    { preHandler: [fastify.verifyToken, fastify.guard.role('admin')] },
    adminController.logout.bind(adminController)
  );
};
