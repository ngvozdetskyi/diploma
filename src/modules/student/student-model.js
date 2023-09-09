const { hashPassword } = require('../../utils');
const BaseModel = require('../common/common-model');

class StudentModel extends BaseModel {
  constructor(data = {}) {
    super();
    this.id = data.id || this.generateUUID();
    this.email = data.email;
    this.phone = data.phone;
    this.student_id = data.studentId || data.student_id;
    this.last_name = data.lastName || data.last_name;
    this.first_name = data.firstName || data.first_name;
  }

  async attachPassword(data = {}) {
    if (data.password) {
      this.password = await hashPassword(data.password);
    }
  }
}

module.exports = StudentModel;
