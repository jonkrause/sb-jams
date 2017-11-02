var twilInfo = require("../../twil.json");
const client = require("twilio")(twilInfo.accountSid, twilInfo.authToken);
var jams = require('./jams.js')

var userColor = "Gold"
var userNumber = "+12482024095";
var fromNumber = "+12487310536";

sendColor = function() {
  client.messages
    .create({
      to: userNumber,
      from: fromNumber,
      body:
        userColor.toUpperCase() +
        " was called today. Don't forget to go test! (do not respond to this message) Thank you"
    })
    .then(message => console.log(message.sid));
};

module.exports = sendColor;
