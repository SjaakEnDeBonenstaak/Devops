var express = require('express');
var router = express.Router();
var thisWillFailLinting = "unused variable";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
