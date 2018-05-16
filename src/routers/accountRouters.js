//创建登录路由
const express=require('express')
const accountRouter=express.Router()
const path=require('path')
//导入控制器
const accountController=require(path.join(__dirname,'../controllers/accountController.js'))
//接收请求,然后交给与这个路由器对应的控制器处理
//处理浏览器的登录请求
accountRouter.get('/login',accountController.getLoginPage)
//处理浏览器的验证码请求
accountRouter.get('/vcode',accountController.getVocode)
//处理浏览器的注册页面请求
accountRouter.get('/register',accountController.getRegisterPage)
//导出路由
module.exports=accountRouter


