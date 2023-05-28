const crypto = require('crypto');

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, process.env.SALT, 64, (err, result) => {
            if (err) {
                console.error(`Password generation error: ${err}`);
                return reject(err);
            }
            resolve(result.toString('base64'));
        });
    });
}

module.exports = { hashPassword };