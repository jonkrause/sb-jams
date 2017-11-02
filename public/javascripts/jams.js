const cheerio = require("cheerio");
const request = require("request");
const moment = require("moment");
var twilInfo = require("../../twil.json");
const client = require("twilio")(twilInfo.accountSid, twilInfo.authToken);
var text = require("./send-text.js");
var mongoose = require("mongoose");

var colorSchema = new mongoose.Schema({
  date: String,
  date_two: String,
  date_three: String,
  colors: Array
});

var color = mongoose.model("Color", colorSchema);

var listArray = [];
var listArray02 = [];
var myColor = [];
var today = moment().format("MM/DD/YYYY");
var yesterday = moment()
  .subtract(1, "days")
  .format("MM/DD/YYYY");

// SCRAPE JAMS SITE //
request("http://www.jamstesting.com/jamsTestDates/", function(err, res, body) {
  if (!err && res.statusCode === 200) {
    console.log("scraping jams...");
    const $ = cheerio.load(body);

    $("tr:nth-child(n+2)").each(function() {
      let color = $(this).text();

      listArray.push(color);
    });

    listArray.shift();

    var listArray02 = listArray.map(function(item, index) {
      return item
        .replace(today, "")
        .replace(yesterday, "")
        .replace(/[\n\t\r ]/g, "");
    });
  }

  var myColor = listArray02;

  // USER VARIABLES //
  var userColor = "Gold";
  // var userNumber = "+12482024095";
  // var fromNumber = "+12487310536";

  // CHECK FOR COLOR. SEND TEXT IF NEEDED //
  for (var i = 0; i < listArray02.length; i++) {
    listArray.push(listArray02[i]);

    if (myColor[i] === userColor) {
      // SEND TEXT MESSAGE //
      // sendColor()
      // SEND TEXT MESSAGE END //
      console.log("////////// " + myColor[i] + " //////////");
    } else {
      console.log(myColor[i]);
    }
  }
  // console.log("my color: " + myColor)

  // SEND COLORS TO MONGO //
  var dbColors = new color({
    colors: myColor,
    date: moment().format("YYYY-MM-DD"),
    date_two: moment().format("MMMM DD, YYYY"),
    date_three: moment().format("MMMM DD, YYYY hh:mm:ss")
  });
  
  dbColors.save(function(err, colors) {
    if (err) return console.error(err);
  });
  // END //
});
