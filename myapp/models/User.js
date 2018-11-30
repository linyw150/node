var mongoose=require('mongoose');
var userSchema=require('../schemas/users');
//数据库会自动把User生成为Users
module.exports=mongoose.model('User',userSchema);//新建名为User的数据库表
