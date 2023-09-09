const BaseModel = require('../common/common-model');

class OrderModel extends BaseModel {
  constructor(data = {}) {
    super();
    this.id = data.id || this.generateUUID();
    this.student_id = data.studentId || data.student_id;
    this.order_number = this._generateOrderNumber();
  }

  _generateOrderNumber(size = 10) {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let result = '';
    for (let i = 0; i < size; i++) {
      const random = Math.floor(Math.random() * 10);
      result += digits[random];
    }
    return result;
  }
}

module.exports = OrderModel;
