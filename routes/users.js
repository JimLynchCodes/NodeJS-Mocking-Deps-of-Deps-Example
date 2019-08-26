const express = require("express");
const router = express.Router();
const Main = require('../route-controllers/Main')

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");

  const main = new Main()

});


module.exports = router;
