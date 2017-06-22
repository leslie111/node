var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('文章首页');
});


router.get('/add', function(req, res, next) {
  res.send('文章增加');
});

router.get('/edit', function(req, res, next) {
  res.send('文章修改');
});

module.exports = router;
