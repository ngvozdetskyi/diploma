const Redis = require("ioredis");

const { REDIS_PASSWORD, REDIS_USER, REDIS_HOST, REDIS_PORT } = process.env;

const redis = new Redis({
    port: Number(REDIS_PORT),
    host: REDIS_HOST,
    username: REDIS_USER,
    password: REDIS_PASSWORD,
});

module.exports = redis;