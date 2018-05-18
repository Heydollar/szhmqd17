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
//处理浏览器的注册用户的请求(注册请求需要向服务器传递用户输入的参数,并且希望参数是不可见的,因此用post请求)
accountRouter.post('/register',accountController.register)
//处理浏览器用户登录的请求(登录请求需要向服务器传递用户输入的参数,并且希望参数是不可见的,因此用post请求)
accountRouter.post('/login',accountController.login)
//处理浏览器用户登录的请求(登录请求需要向服务器传递用户输入的参数,并且希望参数是不可见的,因此用post请求)
accountRouter.get('/logout',accountController.logout)
//导出路由

module.exports=accountRouter


