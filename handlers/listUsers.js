const db = require('../db/main');

module.exports = function listUsers() {
  return { users: db.getCollection('users').data.map(u => ({ displayName: u.displayName })) };
};
