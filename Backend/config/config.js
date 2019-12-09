const mysql = require('mysql');
const db=mysql.createConnection({

    //connectionLimit:20,  //pool connection db.getConnection
    host:"localhost",  //"3.19.219.179"
    user:"root",
    password:"",  //samruddhi
    database: "grubhub" ,
       
 });

 
module.exports = db;