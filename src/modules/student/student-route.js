const {
  createStudent,
  removeStudent,
  updateStudent,
} = require('./student-validation-schemas');
const studentController = require('./student-controller');
const { create, remove, update } = studentController;

module.exports = async function (fastify) {
  fastify.post(
    '/student',
    {
      schema: createStudent,
      preHandler: [fastify.verifyToken, fastify.guard.role('admin')],
    },
    create.bind(studentController)
  );
  fastify.delete(
    '/student',
    {
      schema: removeStudent,
      preHandler: [fastify.verifyToken, fastify.guard.role('admin')],
    },
    remove.bind(studentController)
  );
  fastify.put(
    '/student',
    { schema: updateStudent },
    update.bind(studentController)
  );
};
