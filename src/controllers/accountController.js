const path = require('path')
const fs = require('fs')
var captchapng = require('captchapng');
let vcode=null
//导入mogodb
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'szhmqd17';
//暴露一个返回登录页面的方法
exports.getLoginPage = (req, res) => {
    // fs.readFile(path.join(__dirname,'../statics/views/login.html'),(err,data)=>{
    //     res.setHeader('Content-Type','text/html;charset=utf-8')
    //     res.end(data)

    // })
    res.sendFile(path.join(__dirname, '../statics/views/login.html'))


}
exports.getVocode = (req, res) => {
    vcode=parseInt(Math.random() * 9000 + 1000)
    //把生成好的验证码存在session中
    req.session.vcode = vcode
    var p = new captchapng(80, 30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)


    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);


}
//暴露一个返回注册页面的方法
exports.getRegisterPage = (req, res) => {
    // res.send('哈哈哈')
    res.sendFile(path.join(__dirname, '../statics/views/register.html'))
}
//暴露一个用户注册的方法
exports.register = (req, res) => {

    //定义一个对象,用于返回注册状态(0代表成功,1代表用户名已经存在,2代表注册失败)
    const result = {
        status: 0,
        messages: '注册成功'
    }
    //连接数据库,获取用户输入的用户名,数据比对,判断注册状态
    //Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection('accountInfo');
        //处理注册请求
        collection.findOne({ username: req.body.username }, function (err, docs) {
            if (docs == null) {//插入数据到数据库
                collection.insertOne(
                    req.body, (err, result1) => {
                        if (err) {
                            result.status = 2
                            result.messages = '注册失败'
                        }
                        client.close()
                        res.json(result)
                        console.log(result);
                    });
            }
            else {
                client.close();
                result.status = 1
                result.message = "用户名已存在"
                res.json(result)
            }

        });


    });

}
//暴露一个用户登录的方法
exports.login = (req, res) => {

    //定义一个对象,用于返回注册状态(0代表成功,1代表用户名已经存在,2代表注册失败)
    const result = {
        status: 0,//0代表成功,1代表验证码错误,2代表用户名或密码错误
        messages: '登录成功'
    }
    //连接数据库,获取用户输入的用户名,数据比对,判断登录状态
    //Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection('accountInfo');
        //验证码校验
        if(req.session.vcode!=req.body.vcode){
            result.status=1
            result.messages='验证码错误'
            return
        }

        //判断用户名和密码是否正确
        collection.findOne({ username: req.body.username,password:req.body.password }, function (err, docs) {
            if (docs == null) {//数据不存在

                result.status = 2
                result.messages = '用户名或密码错误'
            }
            else{
                //登录成功
                req.session.loginedName=req.body.username

            }
            client.close()
            res.json(result)
            
        });


    });

}
//暴露一个退出登录的方法
exports.logout=(req,res)=>{
    req.session.loginedName=null
    res.send("<script>window.location.href='/account/login'</script>")
 

}