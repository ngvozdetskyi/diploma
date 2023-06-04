const {
  createStudent,
  removeStudent,
  updateStudent,
} = require('./student-validation-schemas');
const studentController = require('./student-controller');
const { create, remove, update } = studentController;

module.exports = async function (fastify) {
  fastify.post(
    '/student/create',
    {
      schema: createStudent,
      preHandler: [fastify.verifyToken, fastify.guard.role(['admin'])],
    },
    create.bind(studentController)
  );
  fastify.post(
    '/student/remove',
    {
      schema: removeStudent,
      preHandler: [fastify.verifyToken, fastify.guard.role(['admin'])],
    },
    remove.bind(studentController)
  );
  fastify.post(
    '/student/update',
    { schema: updateStudent },
    update.bind(studentController)
  );
};
