var express=require('express');
var router=express.Router();
const crypto = require('crypto');
const mysql = require('mysql');
var db=require('../config/config');
var mongoose =require('mongoose');

var User=require('../models/User');
var Order=require('../models/Order');
var Section=require('../models/Section');
var Bag=require('../models/Bag');

router.post('/ownersignup',function(req,res){
    
    console.log("Inside OwnerSign Up Request");
    
    if(!req.body.name){

    } //validate here
    else{

        

        // console.log("name:"+newOwner.name);
        // console.log("email:"+newOwner.email);
        // console.log("password:"+newOwner.password);
        // console.log("rest_name:"+newOwner.restaurant_name);
        // console.log("zip:"+newOwner.restaurant_zip);
        const secret = 'abc';
        const hash = crypto.createHmac('sha256', secret)
                   .update(req.body.password)
                   .digest('hex');
        console.log("HASSHH:"+hash);
        //  let sql = "INSERT INTO OWNER(name,email,hashpwd,pwd,restaurant_name,restaurant_zip) VALUES ( " + 
        //  mysql.escape(newOwner.name) + " , " + mysql.escape(newOwner.email ) + " , "+ mysql.escape(hash) + " , "+
        //  mysql.escape(newOwner.password )  + " , " + mysql.escape(newOwner.restaurantName )+ " , " + mysql.escape(newOwner.restaurantZip )+" ) ";

         var newOwner=new User({
            _id: mongoose.Types.ObjectId(),
            name:req.body.name,
            email:req.body.email,
            pwd:req.body.password,
            restaurant_name:req.body.restaurantName,
            restaurant_zip:req.body.restaurantZip,
            hashpwd:hash

        });
        
        console.log(newOwner);
        
        newOwner.save().then((user)=> {
            console.log("User created in database: ", user);
            
            //res.sendStatus(200).end();
        }, (err) => {
            console.log("Error Creating User");
            
            //res.sendStatus(400).end();
        })


        // db.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log("1 record inserted");
        //   });
        // console.log("Row inserted in owner table");

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful Registering");
     }    
});


router.post('/ownersignin',function(req,res){
    
    console.log("Inside Owner Sign In  Request");
    

        var oldOwner={
            email:req.body.email,
            password:req.body.password
            
        };

        console.log("email:"+oldOwner.email);
        
        console.log("password:"+oldOwner.password);
        // var hashedPassword = passwordHash.generate(oldOwner.password);
         //console.log("hashed-password:"+hashedPassword);
         const secret = 'abc';
         const hash = crypto.createHmac('sha256', secret)
                    .update(oldOwner.password)
                    .digest('hex');
         console.log("HASSHH:"+hash);
         console.log(typeof(hash));

         User.findOne({
            email: oldOwner.email       
        }).then(function(ownerData,err){
            console.log("First");
            if(ownerData){
            console.log("Second");
            console.log("userdata is ",ownerData);

            if(ownerData.hashpwd===hash){
                const restaurant_id=ownerData._id;
                console.log("hashed password match");
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('restaurant_id',restaurant_id); //setting the restaurant_id
               // req.session.oldBuyer = oldBuyer;
               res.writeHead(200,{
                   'Content-Type' : 'text/plain'
               })
            
           console.log('restaurant_id:',restaurant_id);
           //console.log('restaurant_id:',r1[0].address);
               res.end(JSON.stringify(ownerData));      //restaurant_id
            }

            }
            else
            {console.log("Third");
                console.log("err->",ownerData);
                console.log("error is",err);
                
            }
        }, function(err) {
            console.log("Fourth");
            console.log("error is",err)
            
        })


});



router.post('/menu',function(req,res){
    

    console.log("Inside Menu Request");

        const searchedRestaurantId=req.body.restaurant_id;
        //const searchedRestaurantName=req.body.name;
        console.log("Searched restaurant id:"+req.body.restaurant_id);
        console.log(typeof(searchedRestaurantId));
 
        Order.find({
            restaurant_id: req.body.restaurant_id,
            placed_order:false   
        }).then(function(data,err){
            console.log("First");
            if(data){
            console.log("Second");
            console.log("Data for Owner Menu: ",data);

               // req.session.oldBuyer = oldBuyer;
               res.writeHead(200,{
                   'Content-Type' : 'text/plain'
               })
       
               res.end(JSON.stringify(data));      //buyer_id
            

            }
            else
            {console.log("Third");
                console.log("err->",data);
                console.log("error is",err);
                
            }
        }, function(err) {
            console.log("Fourth");
            console.log("error is",err)
            
        })
         
        
     
    
});

//Buyers who placed orders---this is used on the owner side-------dint find any componenent which calls this------------------------------------------------------------------------------

router.post('/buyerids',function(req,res){
    
    console.log("In BUYER IDS request");
    
        var newOrder={
            restaurant_id:req.body.restaurant_id
           
       
        };

    

        console.log("restaurant_id:"+newOrder.restaurant_id);
       
        

            let sql= "select DISTINCT buyer_id from PLACED_ORDER where restaurant_id= "+mysql.escape(newOrder.restaurant_id);
        
             db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("records selected",result);

                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                //res.end("Successful Deletion");
                res.end(JSON.stringify(JSON.parse(JSON.stringify(result))));
              });
         


            
      
        
}); 


//OWNERORDER-----------------dint find any componenent which calls this--------------------------------------------------------------------
router.post('/ownerorder',function(req,res){
    
    console.log("In Owner Orders request");
    
        var newOrder={
            buyer_id:req.body.buyer_id,
            restaurant_id:req.body.restaurant_id
                      //HAVE TO ADD QUANTITY
            //,
           // quantity:req.body.quantity
        };

        //emailValidator.validate(newBuyer.email);

        console.log("buyer_id:"+newOrder.buyer_id);
        console.log("buyer_id:"+newOrder.restaurant_id);
   
        

            let sql= "select * from PLACED_ORDER where restaurant_id="+mysql.escape(newOrder.restaurant_id+" and buyer_id= "+newOrder.buyer_id)+" order by buyer_id";
        
             db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("records selected",result);

                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                //res.end("Successful Deletion");
                res.end(JSON.stringify(JSON.parse(JSON.stringify(result))));
              });
            //console.log("Row inserted in placed_order table");

      
        
}); 


//owner orders by previos method-------------------------------------------------------------------------------------
router.post('/ordersowner',function(req,res){
    
    console.log("In Orders owners request");
    
        var newOrder={
        //    buyer_id:req.body.buyer_id,
            restaurant_id:req.body.restaurant_id
                      //HAVE TO ADD QUANTITY
            //,
           // quantity:req.body.quantity
        };

     

      
            Order.find({
                restaurant_id: req.body.restaurant_id,
                placed_order:true   
            }).then(function(data,err){
                console.log("First");
                if(data){
                console.log("Second");
                console.log("Data for Owner Menu: ",data);
    
                   // req.session.oldBuyer = oldBuyer;
                   res.writeHead(200,{
                       'Content-Type' : 'text/plain'
                   })
                
               //console.log('buyer_id:',buyer_id);
               //console.log('buyer_id:',r1[0].address);
                   res.end(JSON.stringify(data));      //buyer_id
                
    
                }
                else
                {console.log("Third");
                    console.log("err->",data);
                    console.log("error is",err);
                    
                }
            }, function(err) {
                console.log("Fourth");
                console.log("error is",err)
                
            })
        
}); 


//Adding a section-------------------------------------------------------------------------------------
router.post('/addsection',function(req,res){
    
    console.log("In Order Confirm Request");
    
        
        var newSection=new Section({
            _id: mongoose.Types.ObjectId(),
            section_name:req.body.section,
            restaurant_id:req.body.restaurant_id

        });
        
        console.log(newSection);
        newSection.save().then((section)=> {
            console.log("section created in database: ", section);
            
            //res.sendStatus(200).end();
        }, (err) => {
            console.log("Error Creating section");
            
            //res.sendStatus(400).end();
        })

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful Registering");
       
         
}); 



//Delete  a section------------------------not tested yet-  partially tested------------------------------------------------------------
router.post('/deleteSection',function(req,res){
    
    console.log("In delete section Request");
    
   
    
      

            Order.deleteMany(
                {
                restaurant_id:req.body.restaurant_id,
                placed_order:false,
                section_name:req.body.section
                }
            )
            .then((item)=> {
                console.log("items of this ection Section removed:",item);
                
                //res.sendStatus(200).end();
            }, (err) => {
                console.log("Error Creating item");
                
                //res.sendStatus(400).end();
            })

          res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful Registering");
         
}); 

//remove item from section---------------------------------done n tested----------------------------------------------------
router.post('/removeitemfromsection',function(req,res){
    
    console.log("Remove from section Request");
    
     

        Order.deleteOne(
            {
            _id:req.body.item_id,  
            }
        )
        .then((item)=> {
            console.log("Item removed from the database ", item);
        
        }, (err) => {
            console.log("Error Creating item");
            
         
        })
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful removing");
     
}); 





//CANCEL ORDER OWNER SIDE -------------------------------------------------------------------------------------
router.post('/cancelorder',function(req,res){
    
    console.log("In Owner Orders request");
   


            Order.deleteMany(
                {
                restaurant_id:req.body.restaurant_id,
                placed_order:true,
                buyer_id:req.body.restaurant_id
                }
            )
            .then((order)=> {
                console.log("Orders deleted",order);
                
                //res.sendStatus(200).end();
            }, (err) => {
                console.log("Error Creating order");
                
                //res.sendStatus(400).end();
            })

          res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful Registering");
    
}); 


//Status:orders--------------------------------------tested-----------------------------------------------
router.post('/statusorder',function(req,res){
    
    console.log("In Orders owners request");
    
       

            Order.updateMany({buyer_id:req.body.buyer_id,restaurant_id:req.body.restaurant_id,_id:req.body.item_id}, {$set:{status:req.body.status}}, function(err, doc){
                if (err) 
                console.log("Error updating status")
               
            });
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
                })
        
}); 


module.exports=router;
