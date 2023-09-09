class BaseRepository {
  constructor(client) {
    this.client = client;
  }

  createTransaction() {
    return this.client.transaction();
  }

  async _executeQuery(query, transaction) {
    if (transaction) {
      query.transacting(transaction);
    }
    return await query;
  }

  applyOptions(query, options = {}) {
    for (const property in options) {
      if (property in query && typeof query[property] === 'function') {
        query[property](options[property]);
      }
    }
  }
}

module.exports = BaseRepository;
