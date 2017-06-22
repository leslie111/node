var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/news', function(req, res, next) {
  res.send('新闻列表的api');
});

router.get('/login', function(req, res, next) {
  res.send('登录api');
});

router.get('/registe', function(req, res, next) {
  res.send('registeapi');
});

module.exports = router;
