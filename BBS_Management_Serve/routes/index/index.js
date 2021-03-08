var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/manage', function(req, res, next) {
  console.log('...get / ...');
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

module.exports = router;
