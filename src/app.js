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
/**
 * all代表包含所有的方法 ，比如GET/POST/PUT/DELETE
 * * 是代表所有的url
 * 
 * next 控制你是否能继续访问，如果调用了，就能访问，如果没有调用，就不能再往下走了
 */
app.all("*",(req,res,next)=>{
    if(req.url.includes("student")){
        if(req.session.loginedName){//登陆了
            next()
        }else{
            res.send("<script>alert('请先登录!');window.location='/account/login'</script>")
        }
    }else{//除开学生管理
        next()
    }
})


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
