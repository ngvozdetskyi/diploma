const knex = require('knex');

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, POSTGRES_MAX_CONNECTIONS, POSTGRES_HOST, POSTGRES_PORT } = process.env;

const connectionConfig = {
    client: 'pg',
    connection: {
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    },
    pool: { min: 2, max: Number(POSTGRES_MAX_CONNECTIONS) }
};

module.exports = knex(connectionConfig);