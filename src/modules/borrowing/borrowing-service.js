const BorrowingModel = require('./borrowing-model');
const borrowingRepository = require('./borrowing-repository');
const studentRepository = require('../student/student-repository');
const bookRepository = require('../book/book-repository');
const orderBookRepository = require('../order-book/order-book-repository');

class BorrowingService {
    constructor(borrowingRepository, studentRepository, bookRepository) {
        this.repository = borrowingRepository;
        this.studentRepository = studentRepository;
        this.bookRepository = bookRepository;
        this.orderBookRepository = orderBookRepository;
    }

    async approveBorrowing(studentId, bookId) {
        const transaction = await this.repository.createTransaction();
        try {
            const [students, books, borrowings] = await Promise.all([
                this.studentRepository.find({ id: studentId }),
                this.bookRepository.find({ id: bookId }),
                this.repository.find({ student_id: studentId, book_id: bookId }, '*', transaction),
            ]);
            const [student] = students;
            const [book] = books;
            const [borrow] = borrowings;
            if (!student) {
                throw new Error(`Can not borrow the book due student[${studentId}] does not exist!`);
            }
            if (!book) {
                throw new Error(`Can not borrow the book due book[${bookId}] does not exist!`);
            }
            if (borrow) {
                throw new Error(`Can not borrow the book due the book[${bookId}] is already in use!`);
            }
            if (!student.borrowing_limit) {
                throw new Error(`The student[${studentId}] is not able to borrow the book due the borrowing limit!`);
            }
            student.borrowing_limit = student.borrowing_limit - 1;
            await Promise.all([
                this.repository.create(new BorrowingModel({ studentId, bookId, returnTermDays: book.return_term_days }), transaction),
                this.studentRepository.update({ id: studentId }, student, transaction)
            ]);
            await transaction.commit();
            this.orderBookRepository.remove({ book_id: bookId }).catch((res) => {
                console.error(`OrderBook removing has failed due ${res}`);
            });
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async acceptReturn(studentId, bookId) {
        const [borrowing] = await this.repository.find({ student_id: studentId, book_id: bookId });
        if (!borrowing) {
            throw new Error(`The book[${bookId}] is not borrowed!`);
        }
        const transaction = await this.repository.createTransaction();
        try {
            const [student] = await this.studentRepository.find({ id: studentId }, '*', transaction);
            if (!student) {
                throw new Error(`Can not return the book due student[${studentId}] does not exist!`);
            }
            student.borrowing_limit = Number(student.borrowing_limit) + 1;
            await Promise.all([
                this.repository.remove({ student_id: studentId, book_id: bookId }, transaction),
                this.studentRepository.update({ id: studentId }, student, transaction)
            ]);
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}

module.exports = new BorrowingService(borrowingRepository, studentRepository, bookRepository, orderBookRepository);