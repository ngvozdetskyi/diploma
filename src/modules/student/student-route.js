const { createStudent, removeStudent, updateStudent } = require('./student-validation-schemas');
const studentController = require('./student-controller');
const { create, remove, update } = studentController;

module.exports = async function (fastify) {
    fastify.post('/student/create', { schema: createStudent }, create.bind(studentController));
    fastify.post('/student/remove', { schema: removeStudent }, remove.bind(studentController));
    fastify.post('/student/update', { schema: updateStudent }, update.bind(studentController));
};