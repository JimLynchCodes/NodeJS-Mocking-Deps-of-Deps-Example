const Main = require('./../route-controllers/main')

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");

  const main = new Main()

});

var express = require("express");
var router = express.Router();

module.exports = router;
