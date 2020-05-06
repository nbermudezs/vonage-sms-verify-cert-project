const nexmoClient = require('../lib/nexmoClient');
const db = require('../db/main');

module.exports = function register(req) {
  const number = req.payload.phoneNumber;
  const displayName = req.payload.displayName;
  db.getCollection('users').insertOne({ number, displayName });

  return new Promise(function (resolve, reject) {
    nexmoClient.verify.request(
      { number, brand: "Go 'Round", workflow_id: 1 },
      function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      }
    );
  });
};
