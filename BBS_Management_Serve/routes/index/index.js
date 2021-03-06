var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/manage/*', function(req, res, next) {
  console.log('...get /manage/* ...');
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

router.get('/manage', function(req, res, next) {
  console.log('...get /manage ...');
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

module.exports = router;
