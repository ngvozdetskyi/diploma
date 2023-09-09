const createBook = {
  body: {
    type: 'object',
    required: ['title', 'description', 'author', 'issueDate', 'publication'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      publication: { type: 'string' },
      subjectId: { type: 'string', format: 'uuid' },
      returnTermDays: { type: 'string' },
      author: { type: 'string' },
      issueDate: { type: 'string' },
    },
  },
};

const getAllBooks = {
  query: {
    type: 'object',
    required: [],
    properties: {
      pageSize: { type: 'string' },
      pageNumber: { type: 'string' },
      title: { type: 'string' },
      author: { type: 'string' },
      issueDate: { type: 'string' },
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
    required: [
      'title',
      'description',
      'returnTermDays',
      'author',
      'issueDate',
      'publication',
    ],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      publication: { type: 'string' },
      subjectId: { type: 'string', format: 'uuid' },
      returnTermDays: { type: 'string' },
      author: { type: 'string' },
      issueDate: { type: 'string' },
    },
  },
};

const removeBook = {
  query: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
};

module.exports = { createBook, removeBook, updateBook, getAllBooks };
