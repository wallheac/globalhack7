const crypto = require("crypto");
const hmac = crypto.createHmac('sha256', 'fJei3KSclfp1X');
const callId = process.argv[2];
hmac.update(callId);
console.log(callId, hmac.digest('hex'));
