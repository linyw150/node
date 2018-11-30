//api.js

var express=require('express')
var router=express.Router();
//统一返回方式；
var resoinseData;
/**
 * router.use([path],function)
 * 当前路由将会使用此中间件
 */
//
router.use(function (req,res,next) {
    resoinseData={
        code:0,
        message:''
    }
    next();
})

/*router.post('/user/login',function (req,res,next) {
    console.log("login")
});*/

/*
router.post('/user/register',function (req,res,next) {
    console.log(req.body)

});*/

/**
 * 用户注册
 * 1，用户名是否存在；数据库查询；
 * router.post:
 * 处理任何以"/user/register"结束的请求

 */
/*
router.post('/user/register',function (req,res,next) {
    console.log(req.body)
    var username=req.body.username;
    var password=req.body.password;
    if(username==''||password==''){
        resoinseData.code=1
        resoinseData.message='用户名或密码不能为空！'
        res.json(resoinseData);//json格式返回给前端；
        return
    }else{
        res.json(resoinseData)
    }
});*/

router.post('/user/login',function (req,res,next) {
    console.log(req.body)
    var username=req.body.username;
    var password=req.body.password;
    if(username==''||password==''){
        resoinseData.code=1
        resoinseData.message='用户名或密码不能为空！'
        res.json(resoinseData);//json格式返回给前端；
        return
    }
    //findOne 查询是否存在用户名。如果存在说明用户已被注册
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        console.log(userInfo,"userInfo");
        if(!userInfo){
            resoinseData.code=2
            resoinseData.message='用户名或密码错误'
            res.json(resoinseData)
        }else{
            resoinseData.code=200
            resoinseData.message='操作成功！'
            res.json(resoinseData)
        }
    })
});


var User=require('../models/User')
router.post('/user/register',function (req,res,next) {
    console.log(req.body)
    var username=req.body.username;
    var password=req.body.password;
    if(username==''||password==''){
        resoinseData.code=1
        resoinseData.message='用户名或密码不能为空！'
        res.json(resoinseData);//json格式返回给前端；
        return
    }
    //findOne 查询是否存在用户名。如果存在说明用户已被注册
    User.findOne({
        username:username
    }).then(function (userInfo) {
        console.log(userInfo,"userInfo");
        if(userInfo){
            resoinseData.code=2
            resoinseData.message='用户名已被注册！'
            res.json(resoinseData);
            return
        }
        //保存数据；
        var user=new User(req.body);
        return user.save();

    }).then(function (newUserInfo) {
        console.log(newUserInfo,"newUserInfo");
        resoinseData.message='操作成功！'
        res.json(resoinseData)
    })


});
router.post('/user/logout',function (req,res,next) {
    console.log(req.body)
    req.cookies.set('userInfo',null);
    res.json(resoinseData)

});

module.exports=router;
