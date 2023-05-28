const createStudent = {
    body: {
        type: 'object',
        required: ['phone', 'email', 'password', 'firstName', 'lastName', 'studentId'],
        properties: {
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            studentId: { type: 'string' },
        },
    },
};

const updateStudent = {
    query: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid' },
        },
    },
    body: {
        type: 'object',
        required: ['phone', 'email', 'firstName', 'lastName', 'studentId', 'id'],
        properties: {
            id: { type: 'string', format: 'uuid' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            studentId: { type: 'string' },
        },
    },
};

const removeStudent = {
    body: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid' },
        },
    },
};

module.exports = { createStudent, removeStudent, updateStudent };