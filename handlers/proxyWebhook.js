const smsProxy = require('../lib/smsProxy');

module.exports = function proxyWebhook(req) {
  console.log('received request', req.query);
  
  const from = req.query.msisdn;
  const text = req.query.text;

  smsProxy.proxySms(from, text);

  return { status: 204 };
}

