var express = require('express');
var router = express.Router();

var user = require('./admin/user');
var focus = require('./admin/focus');
var news = require('./admin/news');
var login = require('./admin/login');
var index = require('./admin/index');
var admin = require('./admin/admin');

var session = require("express-session");
router.use(session({   /*注意复制代码的时候要改 app*/
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// admin/user

//中间件
var HOST='';
router.use(function(req, res, next){

    //console.log(req.headers);
    HOST='http://'+req.headers.host+'/';
    next();
})



//判断用户有没有登录
router.use(function(req,res,next){
    //判断登录没有登录
    if(req.session.userinfo){  /*已经登录*/
        next();
    }else{ /*没有登录*/
        // console.log(req.url);  //注意看路由然后判断
        //login

        if(req.url=='/login' ||req.url=='/login/doLogin' ){
            next();
        }else{/*跳转到登录页面*/
            res.redirect(HOST+'admin/login');
        }

    }

})



//admin/user/add

router.use('/index',index);
router.use('/user',user);

router.use('/focus',focus);

router.use('/news',news);

router.use('/login',login);

router.use('/admin',admin);

module.exports = router;
