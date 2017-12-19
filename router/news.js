var express=require('express');
var router=express.Router();

/* 
Add News
*/

router.post('/news',function(req,res){
    var newsData={
                "type":"news"    
    }
    req.getConnection(function(err,connection){
        
        connection.query("insert into news set ?",newsData,function(err,data){
        
            var obj=req.body
            obj[0].newsid=data.insertId
            obj[1].newsid=data.insertId
            
            for(var i=0;i<2;i++){
             connection.query("insert into newsdetails set ?",obj[i],function(err,data){
                 if(err){
                     console.log(err)
                 }
                

        })
          }
        })
        res.json({
            "status":"SUCCESS",
            "message":"News added successfully"
        })  
        
    })
    
})

router.put('/news',function(req,res){
   
    req.getConnection(function(err,connection){
            var obj=req.body          
                      
            for(var i=0;i<2;i++){
                
            var sql="update   newsdetails  set title='"+obj[i].title+"', description='"+obj[i].description+"' where newsdetailsid="+obj[i].newsdetailsid;  
                
                console.log(sql)
             connection.query(sql,obj[i],function(err,data){
                 if(err){
                     console.log(err)
                 }
                

        })
          }
      
        res.json({
            "status":"SUCCESS",
            "message":"News updated successfully"
        })  
        
    })
    
})

router. delete("/news/:id",function(req,res){
    req.getConnection(function(err,connection){
        var id=req.params.id
        var sql="delete from news where newsid="+id;
        connection.query(sql,function(err,data){
            
            res.json({
                "status":"SUCCESS",
                "message":"News deleted successfully."
            })
            
            
        })
    })
    
})

router.get("/news/details/:id",function(req,res){
    
    req.getConnection(function(err,connection){
        
         var id=req.params.id
        var sql="select * from newsdetails where newsid="+id;
         connection.query(sql,function(err,data){
            
            res.json({
                "status":"SUCCESS",
                "data":JSON.parse(JSON.stringify(data))
            })
            
            
        })
        
    })
})


/* 
Add News get all news
*/
router.get("/news",function(req,res){
    
    req.getConnection(function(err,connection){
        connection.query("select * from newsdetails group by newsid",function(err,data){
            
            res.json(JSON.parse(JSON.stringify(data)))
            
        })
        
    })
    
})



router.get("/news/:id/:page",function(req,res){
    var id=req.params.id;
    console.log(req.params)
    var page=req.params.page
    var offset=0
    if(page>1)
    offset=(page-1)*10    
        
    console.log(offset)
    var sql="SELECT * FROM newsdetails where langid="+id+" limit "+ offset+",10" ;
    console.log(sql)
    req.getConnection(function(err,connection){
        connection.query(sql,function(err,data){
            
            res.json(JSON.parse(JSON.stringify(data)))
        })
        
    })
    
})
router.post("/news/search",function(req,res){
    
    req.getConnection(function(err,connection){
        var serachText=req.body.searchText;
        var langid=req.body.langid;
        var sql="SELECT * FROM  newsdetails  where title like '%"+serachText+"%' and langid="+langid;
        console.log(sql)
        connection.query(sql,function(err,data){
            res.json(JSON.parse(JSON.stringify(data)));
        })
        
    })
})
router.post("/news/search/admin",function(req,res){
    
    req.getConnection(function(err,connection){
        var serachText=req.body.searchText;
       
        var sql="SELECT * FROM  newsdetails  where langid like '%1%' and title like '%"+serachText+"%'";
        console.log(sql)
        connection.query(sql,function(err,data){
            res.json(JSON.parse(JSON.stringify(data)));
        })
        
    })
})




router.get('/newslist',function(req,res){
    var que
    var quetext
    req.getConnection(function(err,connection){
        connection.query("select * from news;select * from news right join  newsdetails on news.newsid =newsdetails.newsid",function(err,data){
         
        que=JSON.parse(JSON.stringify(data[0]))
        quetext=JSON.parse(JSON.stringify(data[1]))
        
        var response=[]
            
        for(var i=0;i<que.length;i++){
            var result=[{
                "news":[],
                "newsdetails":[]
            }
        ]   
            result[0].news.push(que[i]);
            for(var j=0;j<quetext.length;j++){
                if(que[i].newsid==quetext[j].newsid){
                  result[0].newsdetails.push(quetext[j]) 
                }
            }
            response.push(result[0])
            
        }    
            
       
            
           res.json(response); 
        })
        
      
    })
    
    
    
})
module.exports=router