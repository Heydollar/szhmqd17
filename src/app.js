//此文件为项目的入口文件,利用express开启web服务
//导入express
const express=require('express')
const app=express()
const path=require('path')
//导入body-parser
var bodyParser = require('body-parser')
//导入express-session
const session = require('express-session')
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 10*60000 }}))
//利用statics中间件加载静态资源
app.use(express.static(path.join(__dirname,'./statics')));
//利用body-parser中间件处理post请求
app.use(bodyParser.urlencoded({ extended: false }))

//导入路由,对浏览器的请求分开处理请求
const accountRouter=require(path.join(__dirname,'./routers/accountRouters'))
const studentManagerRouter=require(path.join(__dirname,'./routers/studentManagerRouter'))
app.use('/account',accountRouter)
app.use('/student',studentManagerRouter)

//监听开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');

})
