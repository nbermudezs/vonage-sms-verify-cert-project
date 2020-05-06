const db = require('../db/main');
const smsProxy = require('../lib/smsProxy');

module.exports = function startChat(req) {
  const displayNameA = req.payload.userA;
  const displayNameB = req.payload.userB;

  const userA = db.getCollection('users').findOne({ displayName: displayNameA });
  const userB = db.getCollection('users').findOne({ displayName: displayNameB });

  console.log('starting chat between', userA.number, userB.number);
  smsProxy.createChat(userA, userB);

  return { status: 0 };
}