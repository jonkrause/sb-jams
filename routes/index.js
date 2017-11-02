var express = require('express');
var router = express.Router();
var jams = require('../public/javascripts/jams')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render("index", { title: "ok cool", list: myColor});
  res.render("index", {array: jams.myColor})
});

module.exports = router;