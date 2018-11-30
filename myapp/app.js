var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//导入mongodb模块
var mongoose=require('mongoose')


var indexRouter = require('./routes/main');
var usersRouter = require('./routes/users');


var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/api',apiRouter);

//设置cookie
app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res)
    console.log(typeof req.cookies.get('userInfo'))//返回 string；
    //解析用户的cookie信息；
    req.userInfo={};
    var cookiesUserInfo=req.cookies.get('userInfo')
    if(cookiesUserInfo){
        try{
            req.userInfo=JSON.parse(cookiesUserInfo)
        }catch(e){}
    }

    next();
})


mongoose.connect('mongodb://localhost:27017/test',function (err) {
    if(err){
        console.log('数据连接失败')
    }else{
        console.log('数据连接成功')
    }
});

var bodyParser=require('body-parser');
/**
 * //bodyParser配置
 *  返回一个只解析urlencoded消息体的中间件，
 *
 *  urlencoded:url编码，只接受utf-8对消息体进行编码，
 *  在前台返回的req对象添加一个新属性body，同时支持自动的gzip/deflate编码解析过的消息放在req.body对象中，
 *  这个对象包含的键值对
 *  当extended设置为true，是任何类型
 *  当extended为false的时候，是string或者一个数组。
 *  extended:如果设置为false，那么对URL-encoded的数据的解析采用querystring库，如果设置为true那么采用qs
 */
app.use(bodyParser.urlencoded({extended:true}))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
