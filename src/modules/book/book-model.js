const BaseModel = require('../common/common-model');

class BookModel extends BaseModel {
  constructor(data = {}) {
    super();
    this.id = data.id || this.generateUUID();
    this.title = data.title;
    this.author = data.author;
    this.description = data.description;
    this.publication = data.publication;
    this.issue_date = data.issueDate || data.issue_date;
    this.subject_id = data.subjectId || data.subject_id;
    this.return_term_days = Number(
      data.returnTermDays ?? data.return_term_days ?? 60
    );
  }
}

module.exports = BookModel;
