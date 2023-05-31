const studentService = require('../student/student-service');
const AuthService = require('./auth-service');

const authService = new AuthService(studentService);

class AuthController {
    constructor(authService) {
        this.service = authService;
    }

    async login(req, res) {
        try {
            const token = await this.service.login({ role: 'student', ...req.body });
            res.status(200).send({ token });
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }

    async logout(req, res) {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];
            await this.service.logout(token);
            res.status(200).redirect('/login');
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }
}

module.exports = new AuthController(authService);
