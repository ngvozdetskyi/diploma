const crypto = require('crypto');
const BaseModel = require('../common/common-model');

class BookModel extends BaseModel {
    constructor(data = {}) {
        super();
        this.id = data.id || crypto.randomUUID();
        this.title = data.title;
        this.description = data.description;
        this.subject_id = data.subjectId;
        this.return_term_days = Number(data.returnTermDays ?? 60);
    }
}

module.exports = BookModel;