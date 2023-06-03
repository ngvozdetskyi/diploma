const crypto = require('crypto');
const { hashPassword } = require('../../common');
const BaseModel = require("../common/common-model");

class StudentModel extends BaseModel {
    constructor(data = {}) {
        super();
        this.id = data.id || crypto.randomUUID();
        this.email = data.email;
        this.student_id = data.studentId;
        this.last_name = data.lastName;
        this.first_name = data.firstName;
        this.phone = data.phone;
    }

    async attachPassword(data = {}) {
        if (data.password) {
            this.password = await hashPassword(data.password);
        }
    }
}

module.exports = StudentModel;