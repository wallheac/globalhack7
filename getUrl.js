const crypto = require("crypto");
const config = require("./config.js");
const hmac = crypto.createHmac('sha256', config.secret);
console.log(config.secret);
const callId = process.argv[2];
hmac.update(callId);
const digest = hmac.digest('hex');
console.log(`https://www.a1ive.org/static/room/?callId=${callId}&key=${digest}`);

