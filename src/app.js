const fastify = require('fastify')();
const fastifyGuard = require('fastify-guard');
const { verifyToken } = require('./modules/auth/auth-decorator');
const studentRoute = require('./modules/student/student-route');
const authRoute = require('./modules/auth/auth-route');
const adminRoute = require('./modules/admin/admin-route');
const bookRoute = require('./modules/book/book-route');
const borrowingRoute = require('./modules/borrowing/borrowing-route');
const orderRoute = require('./modules/order/order-route');

const routes = [
  studentRoute,
  authRoute,
  adminRoute,
  bookRoute,
  borrowingRoute,
  orderRoute,
];

fastify.decorate('verifyToken', verifyToken);

fastify.register(fastifyGuard, {
  errorHandler: (result, req, res) => {
    console.error(`Access denied for user[${req.user.id}].`);
    res.status(403).send('Access denied!');
  },
});

routes.forEach((route) => {
  fastify.register(route);
});

const start = async () => {
  try {
    const { PORT, HOST } = process.env;
    await fastify.listen({ port: Number(PORT), host: HOST });
    console.log(`Server successfully started on the ${PORT} port.`);
  } catch (err) {
    console.error(`Error during staring the app: ${err}`);
    process.exit(1);
  }
};

module.exports = start;
