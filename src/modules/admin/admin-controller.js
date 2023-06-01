const adminService = require('./admin-service');
const AuthService = require('../auth/auth-service');

const authService = new AuthService(adminService);

class AdminController {
    constructor(adminService, authService) {
        this.service = adminService;
        this.authService = authService;
    }

    async login(req, res) {
        try {
            const token = await this.authService.login({ role: 'admin', ...req.body });
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
            await this.authService.logout(token);
            res.status(200).redirect('/admin/login');
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }
}

module.exports = new AdminController(adminService, authService);