const orderService = require('./order-service');

class OrderController {
    constructor(orderService) {
        this.service = orderService;
    }

    async create(req, res) {
        try {
            await this.service.create(req.body.bookIds, req.user.id);
            res.status(201).send(`The order has been created!`);
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }

    async remove(req, res) {
        try {
            await this.service.remove(req.body.id, req.user.id);
            res.status(200).send(`The order has been removed!`);
        } catch (err) {
            console.error(`Error during API call[${req.url}] due ${err}`);
            res.status(400).send(err.message);
        }
    }
}

module.exports = new OrderController(orderService);