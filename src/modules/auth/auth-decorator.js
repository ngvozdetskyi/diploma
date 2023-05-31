const redis = require("../../db/redis/client");

async function verifyToken(req, res) {
    const payload = await _getPayload(req.headers.authorization);
    if (!payload) {
        res.status(401).send('Please sign in.');
    }
    req.user = payload;
}

async function _getPayload(authorization = '') {
    const token = authorization.split(' ')[1];
    const payload = await redis.get(token);
    if (payload) {
        return JSON.parse(payload);
    }
}

module.exports = { verifyToken };

