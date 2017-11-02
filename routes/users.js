var express = require('express');
var router = express.Router();
var list = require("../public/javascripts/jams")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("users", {wow: list.myColor});
});

module.exports = router;
