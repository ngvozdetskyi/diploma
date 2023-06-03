const crypto = require('crypto');
const BaseModel = require('../common/common-model');

class BorrowingModel extends BaseModel {
    constructor(data = {}) {
        super();
        this.id = data.id || crypto.randomUUID();
        this.student_id = data.studentId;
        this.book_id = data.bookId;
        this.receiving_date = data.receivingDate || new Date().toISOString();
        this.return_date = this._getReturnDate(data.returnTermDays);
    }

    _getReturnDate(returnTermDays) {
        const returnDate = new Date(this.receiving_date);
        returnDate.setDate(returnDate.getDate() + Number(returnTermDays));
        return returnDate.toISOString();
    }
}

module.exports = BorrowingModel;