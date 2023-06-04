const app = require('./app');
const dbClient = require('./db/postgres/client');

(async () => {
  await dbClient.migrate.latest();
  await app();
})();
