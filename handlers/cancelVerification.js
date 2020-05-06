const nexmoClient = require('../lib/nexmoClient');

module.exports = function cancelVerification(req) {
  return new Promise(function (resolve, reject) {
    nexmoClient.verify.control(
      { request_id: req.payload.requestId, cmd: 'cancel' },
      function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      }
    );
  });
};
