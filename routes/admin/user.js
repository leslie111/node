var express = require('express');
var router = express.Router();

var DB=require('../../model/db.js');

var HOST='';

router.use(function(req, res, next){

  //console.log(req.headers);

  HOST='http://'+req.headers.host+'/';

  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('用户首页');


    //查询用户信息

    DB.find('user',{},function(err,data){


        console.log(data);
        if(err){


        }else{
            res.render('admin/user/index',{

                host:HOST,   /*每一个后台页面都要把host*/

                list:data

            })

        }


    })


});


router.get('/add', function(req, res, next) {
  res.send('用户增加');
});

router.get('/edit', function(req, res, next) {
  res.send('用户修改');
});

module.exports = router;
