var express=require('express');
var router=express.Router();

router.put("/login",function(req,res){
    
    req.getConnection(function(err,connection){
    
        var sql="select * from users where email='"+req.body.email+"' and password='"+req.body.password+"'";
        console.log(sql)
        
        connection.query(sql,function(err,data){
            var result=JSON.parse(JSON.stringify(data));
            if(result.length==0){
                res.json({
                    "status":"ERROR",
                    "message":"login faild",
                    "data":data
                })
            }
            else{
                res.json({
                    "status":"SUCCESS",
                    "message":" Login success.",
                    "data":data
                })
            }
        })
    
    })
    
})


module.exports=router