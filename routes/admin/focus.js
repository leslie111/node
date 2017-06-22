var express = require('express');
var router = express.Router();

var DB=require('../../model/db.js');

var multiparty = require('multiparty');

var bodyParser = require('body-parser');

var ObjectId = require('mongodb').ObjectID;  /*用于根据id查询*/

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

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
	
	DB.find('focus',{},function(err,data){
		
		
		// console.log(data);
		if(err){
			
			
		}else{
			res.render('admin/focus/index',{
				
				host:HOST,   /*每一个后台页面都要把host*/
				
				list:data
				
			})
			
		}
		
		
	})
	
	
});

/* GET home page. */


//添加
router.get('/add', function(req, res, next) {
  // res.send('轮播图增加');
	res.render('admin/focus/add',{

		host:HOST,   /*每一个后台页面都要把host*/


	})
});

// router.post('/doadd', function(req, res, next) {
// 	console.log(req.body);
// 	DB.insertOne('focus',{
// 		"cate_id": req.body.cate_id,
// 		"title":req.body.title,
// 		"img":req.body.img,
// 		"description":req.body.description,
// 	},function (err,data) {
// 		if(err){
// 			console.log(err)
// 			return;
// 		}
// 		// alert('数据添加成功')
// 		res.redirect('/admin/focus')
// 	})
// });
router.post('/doadd',function(req,res) {
	var form = new multiparty.Form();
	form.uploadDir = './public/upload'
	/*设置图片上传的路径*/
	
	form.parse(req, function (err, fields, files) {
		
		//fields post过来的表单的文本内容
		// console.log(fields)
		// console.log(files)
		
		//
		//files 包含吗了post过来的图片信息
		var path = files.img[0].path;
		/*上传图片的一个地址*/
		
		
		DB.insertOne('focus', {
			"cate_id": fields.cate_id,
			"title": fields.title,
			"img": path,
			"description": fields.description,
		}, function (err, data) {
			if (err) {
				console.log(err)
				return;
			}
			// alert('数据添加成功')
			res.redirect('/admin/focus')
		})
	})
})




//修改
router.get('/edit', function(req, res, next) {
	// console.log(req.query);
	DB.find('focus',{'_id':new ObjectId(req.query.id)},function (err,data) {
		// console.log(data)
		res.render('admin/focus/edit',{
			host:HOST,
			list:data
		});
	})
});

// router.post('/doedit',function (req,res,next) {
// 	// console.log(req.body);
// 	// DB.updateOne('focus',{"_id":new ObjectId(req.body.id)},{
// 	// 	"cate_id":req.body.cate_id,
// 	// 	"title":req.body.title,
// 	// 	"img":req.body.img,
// 	// 	"description":req.body.description,
// 	// },function (err,data) {
// 	// 	if(err){
// 	// 		console.log(err)
// 	// 		return
// 	// 	}
// 	// 	res.redirect(HOST+"admin/focus")
// 	// })
//
router.post('/doedit',function (req,res,next) {
	var form = new multiparty.Form();
	form.uploadDir='./public/upload'  /*设置图片上传的路径*/
	
	form.parse(req, function(err, fields, files) {
		
		//fields post过来的表单的文本内容
		// console.log(fields.id[0])
		// console.log(files)
		
		//
		//files 包含吗了post过来的图片信息
		// var path=files.img[0].path;   /*上传图片的一个地址*/
		
			var path=files.img[0].path;
			DB.updateOne('focus',{"_id":new ObjectId(fields.id[0])},{
				"cate_id": fields.cate_id,
				"title": fields.title,
				"img": path,
				"description": fields.description,
			},function (err,data) {
				if(err){
					console.log(err)
					return
				}
				res.redirect(HOST+"admin/focus")
			})
		
		
	})
})
//删除
router.get('/del', function(req, res, next) {
	console.log(req.query);
	DB.deleteMany('focus',{"_id":new ObjectId(req.query.id)},function (err,data) {
		if(err){
			console.log(err)
			return;
		}
		// res.send("<script>alert('删除操作成功')</script>")
		res.redirect(HOST+"admin/focus")
	})
});
module.exports = router;
