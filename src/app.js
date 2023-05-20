const fastify = require('fastify')();

fastify.get('/', function (request, res) {
    res.send('Hello world!').status(200);
});

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