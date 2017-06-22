var express = require('express');
var router = express.Router();



var HOST='';
router.use(function(req, res, next){

  //console.log(req.headers);
  HOST='http://'+req.headers.host+'/';
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('后台首页');

  res.render('admin/index',{

    host:HOST
  })

});

module.exports = router;
