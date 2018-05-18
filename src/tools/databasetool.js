//封装一个专门和数据库打交道模块,导出方法以供控制器使用
const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017';

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