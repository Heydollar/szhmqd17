//此文件为项目的入口文件,利用express开启web服务
//导入express
const express=require('express')
const app=express()
const path=require('path')
//利用statics中间件加载静态资源
app.use(express.static(path.join(__dirname,'./statics')));

//导入路由,对浏览器的请求分开处理请求
const accountRouter=require(path.join(__dirname,'./routers/accountRouters'))
app.use('/account',accountRouter)

//监听开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');

})
