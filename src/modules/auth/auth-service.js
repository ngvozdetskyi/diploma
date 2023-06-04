const { hashPassword } = require('../../common');
const { randomBytes } = require('crypto');
const redis = require('../../db/redis/client');

const EXPIRE_TIME_IN_SECONDS = 60 * 60 * 48;

class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  async login(data) {
    const { email, password, role } = data;
    const hashedPassword = await hashPassword(password);
    const user = await this.userService.findOne({
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new Error('Credentials are not valid.');
    }
    const token = await this._generateToken();
    await Promise.all([
      redis.set(
        token,
        this._generatePayload({ role, ...user }),
        'EX',
        EXPIRE_TIME_IN_SECONDS
      ),
      redis.sadd(user.id, token),
    ]);
    return token;
  }

  async logout(token) {
    const payload = await redis.get(token);
    const { id: userId } = JSON.parse(payload);
    const sessions = await redis.smembers(userId);
    const promises = [redis.del(userId)];
    for (const session of sessions) {
      promises.push(redis.del(session));
    }
    await Promise.all(promises);
  }

  _generateToken() {
    return new Promise((resolve, reject) => {
      randomBytes(128, (err, buf) => {
        if (err) {
          console.error(`Token generation error: ${err}`);
          return reject(err);
        }
        resolve(buf.toString('base64'));
      });
    });
  }

  _generatePayload(user) {
    const { id, role } = user;
    return JSON.stringify({ id, role: [role] }, null, 2);
  }
}

module.exports = AuthService;
