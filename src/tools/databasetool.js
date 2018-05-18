//封装一个专门和数据库打交道模块,导出方法以供控制器使用
const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017';
//mongodbdb里的_id是封装objectId类型的,要想根据_id来查询数据,需要把它用objectId函数转化
const ObjectId=require('mongodb').ObjectId
//导出objectId,以便其它模块使用
exports.ObjectId=ObjectId

// Database Name
const dbName = 'szhmqd17';
//暴露一个返回学生列表的方法
exports.getList = (collectionName,paramas,callback) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName)
        const collection = db.collection(collectionName);
        // Find some documents
        collection.find(paramas).toArray(function (err, docs) {
            client.close();
            callback(err,docs)

        });

     
    });
}

//暴露一个添加学生的方法
exports.addOne= (collectionName,paramas,callback) => {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName)
        const collection = db.collection(collectionName);
        // 添加一个学生
         // 新增学生
         collection.insertOne(paramas,(err, docs)=> {
             client.close()
             callback(err,docs)
    });
    
    });
}

/**
 * 暴露出去的公共方法，给所有的控制器都可以使用【查询一个的方法】 //{}
 * 参数1：你要操作的集合
 * 参数2：条件
 * 参数3：回调函数，操作完毕之后把结果返回给控制器
 */
exports.getOne = (collectionName, params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //查询一个
        collection.findOne(params,(err,doc)=>{
            client.close();
            callback(err,doc)
        })
    })
}

//暴露一个更新一个方法
exports.updateOne = (collectionName, condition,params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //修改一个
        collection.updateOne(condition,{$set:params},(err,result)=>{
            client.close();
            console.log(result);
            
            callback(err,result)
        })
    })
}

//暴露一个删除一个方法
exports.deleteOne = (collectionName,params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //修改一个
        collection.deleteOne({_id:params},(err,result)=>{
            client.close();
            callback(err,result)
        })
    })
}