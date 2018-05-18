
const path=require('path')
var xtpl = require('xtpl');
//导入database.tool模块
const databasetool=require(path.join(__dirname,'../tools/databasetool'))


//导出返回学生列表的页面
exports.getStudentListPage = (req, res) => {
    //定义一个keyword,区分此时是查询学生列表还是显示全部
    const keyword=req.query.keyword||''
    databasetool.getList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        
            //利用回调函数结合返回的数据渲染页面
            xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
                students:docs,
                keyword,
            },function(error,content){
                res.send(content)
             
            })

        });

    }
   




//暴露一个获取添加学生页面的方法
exports.addStudentPage=(req,res)=>{
    //利用xtpl渲染页面
    xtpl.renderFile(path.join(__dirname,'../statics/views/add.html'),{
       
    },function(error,content){
        res.send(content)
    })
    
}

//暴露一个添加学生的方法
exports.addStudent=(req,res)=>{
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('studentInfo');

        // 新增学生
        collection.insertOne(req.body,(err, docs)=> {
             
            client.close();  
            res.send("<script>window.location.href='/student/list'</script>")
    });
  
   
  
})
}