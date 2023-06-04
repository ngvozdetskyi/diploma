const BaseModel = require('../common/common-model');

class OrderModel extends BaseModel {
    constructor(data = {}) {
        super();
        this.id = data.id || this.generateUUID();
        this.student_id = data.studentId;
        this.order_id = this._generateOrderId();
    }

    _generateOrderId(size = 20) {
        let result = '';
        for (let i = 0; i < size; i++) {
            const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            const random = Math.floor(Math.random() * 10);
            result += digits[random];
        }
        return result;
    }
}

module.exports = OrderModel;