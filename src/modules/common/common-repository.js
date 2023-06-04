class BaseRepository {
  constructor(client) {
    this.client = client;
  }

  createTransaction() {
    return this.client.transaction();
  }

  async _executeQuery(query, args = []) {
    const transaction = args[args.length - 1];
    if (transaction) {
      query.transacting(transaction);
    }
    return await query;
  }
}

module.exports = BaseRepository;
