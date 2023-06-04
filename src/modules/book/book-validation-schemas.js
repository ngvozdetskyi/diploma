const createBook = {
  body: {
    type: 'object',
    required: ['title', 'description'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      subjectId: { type: 'string', format: 'uuid' },
      returnTermDays: { type: 'string' },
    },
  },
};

const updateBook = {
  query: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  body: {
    type: 'object',
    required: ['title', 'description', 'returnTermDays'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      subjectId: { type: 'string', format: 'uuid' },
      returnTermDays: { type: 'string' },
    },
  },
};

const removeBook = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
};

module.exports = { createBook, removeBook, updateBook };
