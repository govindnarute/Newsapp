var express=require('express');
var mySql=require('mysql');
var bodyParser=require('body-parser');
var news=require('./router/news');
var login=require('./router/login');
var cors = require('cors')
var connection  = require('express-myconnection'); 

var myApp=express();
myApp.use(bodyParser.json());
myApp.options('*', cors());
myApp.use(
    
    connection(mySql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'newsapp',
       multipleStatements: true,
    connectionLimit: 20
    },'single')
);//route index, hello world

//var allowCrossDomain = function(req, res, next) {
//    console.log('test')
//    res.header('Access-Control-Allow-Origin', 'example.com');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//
//    next();
//}
// myApp.use(allowCrossDomain);




myApp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




myApp.get('/',function(req,res){
    res.send("working........");
})

myApp.use('/newsapp/api',news)
myApp.use('/newsapp/api/user',login)
myApp.listen(3000);
