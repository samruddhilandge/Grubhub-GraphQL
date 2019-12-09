var express=require('express');
var app = express();
var router=express.Router();
const crypto = require('crypto');
const mysql = require('mysql');
//const mysql = require('mysql');
var db=require('../config/config');
var mongoose =require('mongoose');

var User=require('../models/User');
var Order=require('../models/Order');
var Bag=require('../models/Bag');
var Message=require('../models/Message');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', {session: false});

app.use(passport.initialize());
require('../config/passport')(passport);

router.post('/buyersignin',function(req,res){
    
    console.log("Inside BuyerSign In  Request");

        var oldBuyer={
            email:req.body.email,
            password:req.body.password

        };

        console.log("email:"+oldBuyer.email);
        
        console.log("password:"+oldBuyer.password);
        

         const secret = 'abc';
         const hash = crypto.createHmac('sha256', secret)
                    .update(oldBuyer.password)
                    .digest('hex');
         console.log("HASSHH:"+hash);
         console.log(typeof(hash));
        //  //let sql = 'SELECT hashpwd FROM BUYER where email='+mysql.escape(oldBuyer.email);
        //  //console.log(hpwd);
        //  let sql = 'SELECT * FROM BUYER where email='+mysql.escape(oldBuyer.email);
         
        //  db.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log("result:"+result);
        //     console.log(result);
        //     let r=JSON.stringify(result);
        //     console.log(JSON.stringify(result));
        //     let r1=JSON.parse(r);
        //     console.log(JSON.parse(r));
        //     if(r1[0].hashpwd===hash){
        //         console.log("hashed password match");
        //          res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        //          res.cookie('buyer_id',r1[0].buyer_id); //setting the buyer_id
        //         // req.session.oldBuyer = oldBuyer;
        //         res.writeHead(200,{
        //             'Content-Type' : 'text/plain'
        //         })
        //     const buyer_id=r1[0].id;
        //     console.log('buyer_id:',buyer_id);
        //     console.log('buyer_id:',r1[0].address);
        //         res.end(JSON.stringify(r1));      //buyer_id
                
        //      }

             User.findOne({
                email: oldBuyer.email       
            }).then(function(buyerData,err){
                console.log("First");
                if(buyerData){
                console.log("Second");
                console.log("userdata is ",buyerData);

                if(buyerData.hashpwd===hash){
                    const buyer_id=buyerData._id;
                    console.log("hashed password match");

                   res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    res.cookie('buyer_id',buyer_id);
                   res.writeHead(200,{
                       'Content-Type' : 'text/plain'
                   })
                
               console.log('buyer_id:',buyer_id);
            
                   res.end(JSON.stringify(buyerData));      //buyer_id
                }

                }
                else
                {console.log("Third");
                    console.log("err->",buyerData);
                    console.log("error is",err);
                    
                }
            }, function(err) {
                console.log("Fourth");
                console.log("error is",err)
                
            })

           
           
});

router.post('/buyersignup',function(req,res){
    
    console.log("Inside Buyer Sign Up Request");


});


//Message to the buyer by the owner
router.post('/messagetobuyer',function(req,res){
    
    console.log("Inside send message in the owner");

        var newMessage=new Message({
            _id: mongoose.Types.ObjectId(),
            buyer_id:req.body.buyer_id,
            restaurant_id:req.body.restaurant_id,
            restaurant_name:req.body.restaurant_name,
            isOwnerSender:true,
            message:req.body.message
        });

        console.log("New Message:",newMessage);
        
        
        newMessage.save().then((message)=> {
            console.log("message created in database: ", message);
            
            //res.sendStatus(200).end();
        }, (err) => {
            console.log("Error inserting message in the database");
            
            //res.sendStatus(400).end();
        })


        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successfuly Message send");

}); 


router.post('/getmessagestobuyer',function(req,res){
    
    console.log("To get the messages BUYER SIDE");


          Message.find({
            buyer_id: req.body.buyer_id,
            isOwnerSender:true  
        }).then(function(data,err){
            if(data){
            
            console.log("Data from Message collection is: ",data);

               // req.session.oldBuyer = oldBuyer;
               res.writeHead(200,{
                   'Content-Type' : 'text/plain'
               })
            
           
               res.end(JSON.stringify(data));     
            }
            else{
                console.log("err->",data);
                console.log("error is",err);
                
            }
        }, function(err) {
            console.log("error is",err)
            
        })

});


router.post('/messagetoowner',function(req,res){
    
    console.log("Inside send message in the BUYER");

        var newMessage=new Message({
            _id: mongoose.Types.ObjectId(),
            buyer_id:req.body.buyer_id,
            restaurant_id:req.body.restaurant_id,
            isOwnerSender:false,
            buyer_name:req.body.buyer_name,
            message:req.body.message
        });

        console.log("New Message of Buyer to the owner:",newMessage);
        
        
        newMessage.save().then((message)=> {
            console.log("message created in database: ", message);
        
        }, (err) => {
            console.log("Error inserting message in the database");
        
        })


        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successfuly Message send");

}); 



router.post('/getmessagestoowner',function(req,res){
    
    console.log("To get the messages OWNER SIDE");


          Message.find({
            restaurant_id: req.body.restaurant_id,
            isOwnerSender:false  
        }).then(function(data,err){
            if(data){
            
            console.log("Data from Message collection is: ",data);

               // req.session.oldBuyer = oldBuyer;
               res.writeHead(200,{
                   'Content-Type' : 'text/plain'
               })
            
     
               res.end(JSON.stringify(data));      //buyer_id
            }
            else{
                console.log("err->",data);
                console.log("error is",err);
                
            }
        })

});



//Buyer Home Page   //requireAuth
router.post('/search',function(req,res){
    
    console.log("Inside BuyerHome Search Request");

        console.log("Searched item:"+req.body.searchedItem);
        
        const searchedItem=req.body.searchedItem;
        console.log(typeof(searchedItem));
        console.log('Searched item',searchedItem);
          Order.find({
            item_name: searchedItem,
            placed_order:false     
        }).then(function(data,err){
            console.log("First");
            if(data){
            console.log("Second");
            console.log("Data from Order collection is: ",data);

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


//Cuisine Search 
router.post('/cuisinesearch',function(req,res){
    
    console.log("Inside BuyerHome Cuisine Search Request");

        console.log("Searched item:"+req.body.cuisineSearched);
    
        const cuisineSearched=req.body.cuisineSearched;
        console.log(typeof(cuisineSearched));
        console.log('Searched cuisine item',cuisineSearched);


          Order.find({
            item_name: searchedItem,
            placed_order:false     
        }).then(function(data,err){
            console.log("First");
            if(data){
            console.log("Second");
            console.log("Data from Order collection is: ",data);

               // req.session.oldBuyer = oldBuyer;
               res.writeHead(200,{
                   'Content-Type' : 'text/plain'
               })
   
               res.end(JSON.stringify(data));      
            

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







//Individual Restaurant Page
router.post('/restaurant',function(req,res){
    
    console.log("Inside Restaurant Request");

        
    
        const searchedRestaurantId=req.body.id;
        //const searchedRestaurantName=req.body.name;
        console.log("Searched restaurant id:"+req.body.id);
        console.log(typeof(searchedRestaurantId));
        
      
          

          Order.find({
            restaurant_id: searchedRestaurantId,
            placed_order:false    
        }).then(function(data,err){
            console.log("First");
            if(data){
            console.log("Second");
            console.log("Data from Order collection is: ",data);

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




//getting Section table data--------remaining-----------------------------------------------------------------------------
router.post('/sectiontabledata',function(req,res){
    
    console.log("Accessing section table data");
    
       //const restaurant_id=req.body.restaurant_id;

        Section.find({
            restaurant_id:req.body.restaurant_id
        }).then(function(data,err){
            console.log("First");
            if(data){
            console.log("Second");
            console.log("Data from Section collection is: ",data);

               // req.session.oldBuyer = oldBuyer;
               res.writeHead(200,{
                   'Content-Type' : 'text/plain'
               })
            
           //console.log('buyer_id:',buyer_id);
           //console.log('buyer_id:',r1[0].address);
               res.end(JSON.stringify(data));      
            

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


//Add to bag BUYER-------------------------------------------------------------------------------------
router.post('/addtobag',function(req,res){
    
    console.log("Inside Add to bag Request");



    var newItem=new Bag({
        _id: mongoose.Types.ObjectId(),
        buyer_id:req.body.buyer_id,
        item_name:req.body.item_name,
        item_id:req.body.item_id,
        price:req.body.price,
        restaurant_id:req.body.restaurant_id ,
        quantity:req.body.quantity
        
    });
    console.log("ADD TO BAG BUYER ID::"+newItem.buyer_id);
        console.log("item_name:"+newItem.item_name);
        //console.log("description:"+newItem.prive);
        console.log("price:"+newItem.price);
    console.log("New Item:",newItem);
    
    
    newItem.save().then((item)=> {
        console.log("item inserted in database: ", item);
        
        //res.sendStatus(200).end();
    }, (err) => {
        console.log("Error inserting item");
  
    })


    res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    res.end("Successful Registering");

        
}); 

//BAG Table data   here ADD BUYER ID TO THE QUERY SO ONLY THE BUYER WHO IS LOGGED IN 'S DATA WILL BE USED.-------------------------------------------------------------------------------------
router.post('/bagtable',function(req,res){
    
    console.log("Accessing bagtable data");
    
        const buyer={
            buyer_id:req.body.buyer_id
        }
    

        Bag.find({
            buyer_id: req.body.buyer_id    
        }).then(function(data,err){
            console.log("First");
            if(data){
            console.log("Second");
            console.log("Data from Bag collection is: ",data);

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

//Remove from bag-------------------------------------------------------------------------------------
router.post('/removefrombag',function(req,res){
    
    console.log("Remove from bag Request");
    
    
        
        
        Bag.deleteOne(
            {
            item_id:req.body.item_id,
            buyer_id:req.body.buyer_id   
            }
        )
        .then((item)=> {
            console.log("Item removed from the database ", item);
            
            //res.sendStatus(200).end();
        }, (err) => {
            console.log("Error Creating item");

        })
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful removing");
     
}); 


//Order Confirm-------------------------------------------------------------------------------------
router.post('/orderconfirm',function(req,res){
    
    console.log("In Order Confirm Request");
    
        var newOrder={
            bag:req.body.bag1,
            buyer_id:req.body.buyer_id,
            buyer_name:req.body.buyer_name,
            buyer_address:req.body.buyer_address
           
     
        };

        //emailValidator.validate(newBuyer.email);

        console.log("item_name:"+newOrder.buyer_id);
        //console.log("description:"+newItem.prive);
        console.log("BUyer Name:"+newOrder.buyer_name);
        console.log("Buyer Address:"+newOrder.buyer_address);

         newOrder.bag.map(b=>{


            var newOrder1=new Order({
                _id: mongoose.Types.ObjectId(),
                item_id:b.item_id,
                item_name:b.item_name,
                quantity:b.quantity,
                restaurant_id:b.restaurant_id,
                buyer_id:req.body.buyer_id, 
                buyer_name:req.body.buyer_name,
                buyer_address:req.body.buyer_address,
                placed_order:true
            });
            console.log("ADD TO BAG BUYER ID::"+newOrder1.buyer_id);
                console.log("item_name:"+newOrder1.item_name);
                
            console.log("New Item:",newOrder1);
            
            
            newOrder1.save().then((item)=> {
                console.log("order inserted in Order: ", item);
                
                //res.sendStatus(200).end();
            }, (err) => {
                console.log("Error inserting item");
                
                //res.sendStatus(400).end();
            })    
            })
      
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful Deletion");
     
}); 




router.post('/afterorderconfirm',function(req,res){
    
    console.log("In After Order Confirm Request");
    
        var newOrder={
            bag:req.body.bag1,
            buyer_id:req.body.buyer_id,
            buyer_name:req.body.buyer_name,
            buyer_address:req.body.buyer_address
           
                      //HAVE TO ADD QUANTITY
            //,
           // quantity:req.body.quantity
        };

    

            Bag.deleteMany(
                {
                buyer_id:req.body.buyer_id   
                }
            )
            .then((item)=> {
                console.log("Item removed from the Bag with partiuclar buyer_id", item);
                
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




//present orders BUYER-------------------------------------------------------------------------------------
router.post('/buyerorder',function(req,res){
    
    console.log("In Buyer Orders request");
    
        var order={
            buyer_id:req.body.buyer_id,
         
        };



        console.log("buyer_id:"+order.buyer_id);
   

      
            Order.find({
                buyer_id: req.body.buyer_id    
            }).then(function(data,err){
                console.log("First");
                if(data){
                console.log("Second");
                console.log("Data from Bag collection is: ",data);
    
                   // req.session.oldBuyer = oldBuyer;
                   res.writeHead(200,{
                       'Content-Type' : 'text/plain'
                   })
          
                   res.end(JSON.stringify(data));      
                
    
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

//PAST ORDERS BUYER ----------------remaining---------------------------------------------------------------------

router.post('/pastbuyerorder',function(req,res){
    
    console.log("In Buyer Orders request");
    
        var order={
            buyer_id:req.body.buyer_id,
        };

        

        console.log("buyer_id:"+order.buyer_id);
        console.log("buyer_id:"+order.restaurant_id);
 
        

            let sql= "select * from PLACED_ORDER where buyer_id= "+mysql.escape(order.buyer_id)+" and (status='delivered' or status='cancel')";
        
             db.query(sql, function (err, result) {
                if (err) throw err;
                console.log("records selected",result);

                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                //res.end("Successful Deletion");
                res.end(JSON.stringify(JSON.parse(JSON.stringify(result))));
              });
            //console.log("Row inserted in PLACED_ORDER table");

      
        
}); 


module.exports=router;