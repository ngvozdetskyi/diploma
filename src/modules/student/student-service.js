const StudentModel = require('./student-model');
const studentRepository = require('./student-repository');

class StudentService {
    constructor(studentRepository) {
        this.repository = studentRepository;
    }

    async create(data) {
        const doesStudentExist = await this.repository.doesStudentExist({ email: data.email, student_id: data.studentId });
        if (doesStudentExist) {
            throw new Error('Student with such data already exists. Try to change email or student id!');
        }
        const student = new StudentModel(data);
        await student.attachPassword(data);
        await this.repository.create(student);
    }

    async update(id, data) {
        const doesStudentExist = await this.repository.doesStudentExist({ id });
        if (!doesStudentExist) {
            throw new Error(`Student[${id}] does not exist!`);
        }
        await this.repository.update({ id }, new StudentModel({ id, ...data }));
    }

    find(filter, fields) {
        return this.repository.find(filter, fields);
    }

    async findOne(filter, fields) {
        const students = await this.repository.find(filter, fields);
        if (!students.length) {
            return;
        }
        return students[0];
    }

    remove(data) {
        return this.repository.remove(data);
    }
}

module.exports = new StudentService(studentRepository);