const borrowingService = require('./borrowing-service');

class BorrowingController {
    constructor(borrowingService) {
        this.service = borrowingService;
    }

    async approveBorrowing(req, res) {
        try {
            await this.service.approveBorrowing(req.body.studentId, req.body.bookId);
            res.status(201).send(`The book[${req.body.bookId}] has been borrowed!`);
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }

    async acceptReturn(req, res) {
        try {
            await this.service.acceptReturn(req.body.studentId, req.body.bookId);
            res.status(201).send(`The book[${req.body.bookId}] has been returned!`);
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }
}

module.exports = new BorrowingController(borrowingService);