const adminRepository = require('./admin-repository');

class AdminService {
  constructor(adminRepository) {
    this.repository = adminRepository;
  }

  async findOne(filter, fields) {
    const admins = await this.repository.find(filter, fields);
    if (!admins.length) {
      return;
    }
    return admins[0];
  }
}

module.exports = new AdminService(adminRepository);
