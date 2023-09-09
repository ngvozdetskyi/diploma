const BaseModel = require('../common/common-model');

class BorrowingModel extends BaseModel {
  constructor(data = {}) {
    super();
    this.id = data.id || this.generateUUID();
    this.student_id = data.studentId || data.student_id;
    this.book_id = data.bookId || data.book_id;
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
