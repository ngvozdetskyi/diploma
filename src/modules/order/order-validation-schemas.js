const createOrder = {
  body: {
    type: 'object',
    required: ['bookIds'],
    properties: {
      bookIds: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
        minItems: 1,
        uniqueItems: true,
      },
    },
  },
};

const removeOrder = {
  query: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
};

module.exports = { createOrder, removeOrder };
