const BaseModel = require('../common/common-model');

class OrderBookModel extends BaseModel {
  constructor(data = {}) {
    super();
    this.id = data.id || this.generateUUID();
    this.order_id = data.orderId;
    this.book_id = data.bookId;
  }
}

module.exports = OrderBookModel;
