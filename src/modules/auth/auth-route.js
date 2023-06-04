const { login } = require('./auth-validation-schemas');
const authController = require('./auth-controller');

module.exports = async function (fastify) {
  fastify.post(
    '/login',
    { schema: login },
    authController.login.bind(authController)
  );
  fastify.post(
    '/logout',
    { preHandler: [fastify.verifyToken, fastify.guard.role(['student'])] },
    authController.logout.bind(authController)
  );
};
