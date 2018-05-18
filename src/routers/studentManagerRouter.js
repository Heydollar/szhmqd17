//创建学生管理路由
const express=require('express')
const studentManagerRouter=express.Router()
const path=require('path')
//导入控制器
const studentManagerController=require(path.join(__dirname,'../controllers/studentManagerController'))
//接收请求,然后交给与这个路由器对应的控制器处理
//处理浏览器的学生管理页面的请求
studentManagerRouter.get('/list',studentManagerController.getStudentListPage)
//处理浏览器获取添加学生页面的请求
studentManagerRouter.get('/add',studentManagerController.addStudentPage)
//处理添加学生的请求
studentManagerRouter.post('/add',studentManagerController.addStudent)





//导出路由
module.exports=studentManagerRouter


