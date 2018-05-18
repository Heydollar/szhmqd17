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
//处理获取编辑页面的请求
studentManagerRouter.get('/edit/:studentId',studentManagerController.getEditStudentPage)
//处理修改学生信息的请求
studentManagerRouter.post('/edit/:studentId',studentManagerController.editStudent)
//处理删除学生信息的请求
studentManagerRouter.get('/delete/:studentId',studentManagerController.deleteStudent)




//导出路由
module.exports=studentManagerRouter


