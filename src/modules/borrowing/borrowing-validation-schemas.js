const borrow = {
    body: {
        type: 'object',
        required: ['studentId', 'bookId'],
        properties: {
            bookId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
        },
    },
};

const acceptReturn = {
    body: {
        type: 'object',
        required: ['studentId', 'bookId'],
        properties: {
            bookId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
        },
    },
};

module.exports = { borrow, acceptReturn };