var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mysql = require('mysql');

const crypto = require('crypto');
const Joi=require('@hapi/joi');
var db=require('./config/config'); 
const path = require('path');
const fs = require('fs');
const jwt = require("jsonwebtoken");
var fileLocation="";
var imageName="";
let dir="";
var mongoose =require('mongoose');
var User=require('./models/User');
var Order=require('./models/Order');
var passport=require('passport');

var graphqlHTTP=require('express-graphql');
var schema=require('./schema/schema');


require('./config/passport');
mongoose.connect("mongodb+srv://samruddhi:samruddhi@sample-lgacm.mongodb.net/grubhub?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const multer = require('multer');


 
app.use(passport.initialize());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));   //http://3.19.219.179:3000

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');   //http://3.19.219.179:3000
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


var buyer=require('./routes/Buyer');
var owner=require('./routes/Owner');


app.use(buyer);
app.use(owner);
app.use('/graphql',graphqlHTTP({

    schema,
    graphiql:true
}));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`destination`);  
        console.log(req.body.buyer_id);
        dir = `./uploads`;
        //let dir = path.join(__dirname + '/uploads',file);
        console.log("dir name"+dir);
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
        console.log("multer disk storage running...")
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        imageName=file.originalname;
        fileLocation=path.join(dir,file.originalname);
        console.log(`filename`);  
        console.log(req.body.buyer_id);
        cb(null, file.originalname);
    },
  });
  
  var upload = multer({ storage });
  
  
app.post('/profilePhoto', upload.single('selectedFile'), (req, res) => {
    console.log("Req : ", req.body);
    console.log("Res : ", res.file);
    res.send();
  });


app.post('/download/:file(*)',(req, res) => {
console.log("Inside download file");
var file = req.params.file;
fileLocation = path.join(__dirname , file);
var img = fs.readFileSync(fileLocation);
var base64img = new Buffer(img).toString('base64');
res.writeHead(200, { 'Content-Type': 'image/jpg' });
res.end(base64img);
  });

  app.post('/itemPhoto', upload.single('selectedFile'), (req, res) => {
    console.log("Req : ", req.body);
    console.log("Res : ", res.file);
    res.send();
  });

app.listen(5000,()=>{
    console.log("Starting the graphql server at port 5000");
})




