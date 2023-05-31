const fastify = require('fastify')();
const fastifyGuard = require('fastify-guard');
const { verifyToken } = require('./modules/auth/auth-decorator');
const studentRoute = require('./modules/student/student-route');
const authRoute = require('./modules/auth/auth-route');

fastify.decorate('verifyToken', verifyToken);

fastify.get('/', function (request, res) {
    res.send('Hello world!').status(200);
});
fastify.register(
    fastifyGuard,
    {
        errorHandler: (result, req, res) => {
            console.error(`Access denied for user[${req.user.id}].`);
            res.status(403).send('Access denied!')
        },
    }
);
fastify.register(studentRoute);
fastify.register(authRoute);

const start = async () => {
    try {
        const { PORT, HOST } = process.env;
        await fastify.listen({ port: Number(PORT), host: HOST })
        console.log(`Server successfully started on the ${PORT} port.`);
    } catch (err) {
        console.error(`Error during staring the app: ${err}`);
        process.exit(1)
    }
};

module.exports = start;