const studentService = require('./student-service');

class StudentController {
    constructor(studentService) {
        this.service = studentService;
    }

    async create(req, res) {
        try {
            await this.service.create(req.body);
            res.status(201).send('Student has been successfully created.');
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }

    async update(req, res) {
        try {
            await this.service.update(req.query.id, req.body);
            res.status(200).send('Student has been successfully updated.');
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }

    async remove(req, res) {
        try {
            await this.service.remove(req.body);
            res.status(200).send('Student has been successfully removed.');
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }
}

module.exports = new StudentController(studentService);