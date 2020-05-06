const db = require('./main');
db.addCollection('users');
// db.getCollection('users').insert([
//   { displayName: 'userA', number: '12172473837' },
//   { displayName: 'userB', number: '12177212898' }
// ]);
db.saveDatabase();
