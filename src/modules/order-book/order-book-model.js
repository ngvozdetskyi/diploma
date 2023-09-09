const BaseModel = require('../common/common-model');

class OrderBookModel extends BaseModel {
  constructor(data = {}) {
    super();
    this.id = data.id || this.generateUUID();
    this.order_id = data.orderId || data.order_id;
    this.book_id = data.bookId || data.book_id;
  }
}

module.exports = OrderBookModel;
