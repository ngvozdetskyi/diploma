const OrderModel = require('./order-model');
const OrderBookModel = require('../order-book/order-book-model');
const orderRepository = require('./order-repository');
const orderBookRepository = require('../order-book/order-book-repository');
const studentRepository = require('../student/student-repository');

class OrderService {
    constructor(orderRepository, studentRepository, orderBookRepository) {
        this.repository = orderRepository;
        this.studentRepository = studentRepository;
        this.orderBookRepository = orderBookRepository;
    }

    async create(bookIds = [], studentId) {
        const [student] = await this.studentRepository.find({ id: studentId });
        if (!student) {
            throw new Error(`Can not create the order due student[${studentId}] does not exist!`);
        }
        if (bookIds.length > student.borrowing_limit) {
            throw new Error(`You are out of borrowing limit! You can borrow only ${student.borrowing_limit} books.`);
        }
        const order = new OrderModel({ studentId });
        await this.repository.create(order);
        const promises = bookIds.map((bookId) => {
            return this.orderBookRepository.create(new OrderBookModel({ bookId, orderId: order.id }));
        });
        await Promise.all(promises);
    }

    async remove(orderId, studentId) {
        await this.repository.remove({ id: orderId, student_id: studentId });
    }
}

module.exports = new OrderService(orderRepository, studentRepository, orderBookRepository);