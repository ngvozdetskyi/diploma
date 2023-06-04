const login = {
  body: {
    type: 'object',
    required: ['password', 'email'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
};

module.exports = { login };
