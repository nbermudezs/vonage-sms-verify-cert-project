const nexmoClient = require('../lib/nexmoClient');

module.exports = function confirmNumber(req) {
  return new Promise(function (resolve, reject) {
    nexmoClient.verify.check(
      { request_id: req.payload.requestId, code: req.payload.verificationCode },
      function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      }
    );
  });
};
