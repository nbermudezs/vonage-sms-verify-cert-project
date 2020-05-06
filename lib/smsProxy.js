const nexmoClient = require('./nexmoClient');

class SMSProxy {
  createChat(userA, userB) {
    this.chat = {
      userA,
      userB
    };
    this.introduceUsers();
  }

  introduceUsers() {
    nexmoClient.message.sendSms(
      process.env.VIRTUAL_NUMBER,
      this.chat.userA.number,
      `Reply to this SMS to talk to ${this.chat.userA.displayName}`
    );

    nexmoClient.message.sendSms(
      process.env.VIRTUAL_NUMBER,
      this.chat.userB.number,
      `Reply to this SMS to talk to ${this.chat.userB.displayName}`
    );
  }

  getRealDestinationNumber(from) {
    if (!this.chat) {
      return null;
    }

    let destinationRealNumber = null;

    // Use `from` numbers to work out who is sending to whom
    const fromUserA = from === this.chat.userA.number;
    const fromUserB = from === this.chat.userB.number;

    if (fromUserA || fromUserB) {
      destinationRealNumber = fromUserA
        ? this.chat.userB.number
        : this.chat.userA.number;
    }

    return destinationRealNumber;
  }

  proxySms(from, text) {
    // Determine which real number to send the SMS to
    const destinationRealNumber = this.getRealDestinationNumber(from);

    if (destinationRealNumber === null) {
      console.log(`No chat found for this number`);
      return;
    }

    // Send the SMS from the virtual number to the real number
    nexmoClient.message.sendSms(
      process.env.VIRTUAL_NUMBER,
      destinationRealNumber,
      text
    );
  }
}

module.exports = new SMSProxy();
