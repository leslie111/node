var express = require('express');
var path = require('path');


var cookieParser = require('cookie-parser');


var index = require('./routes/index');
var admin = require('./routes/admin')
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));



app.use('/api',api);

app.use('/admin',admin);

app.use('/', index);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin/focus/public',express.static(path.join(__dirname, 'public')));
app.use('/admin/public',express.static(path.join(__dirname, 'public')));




app.listen(3000,'127.0.0.1');