var mongoose =require('mongoose');
var User = mongoose.Schema({
    // _id: mongoose.Types.ObjectId,
    // id:{
    //     type: Number
    // },
    restaurant_id:{
        type: String
    },
    name:{
       type : String
    },
    email: {
        type : String
    },
    pwd:{
        type : String
    },
    hashpwd:{
        type : String
    },
    phone:{
        type : Number
    },
    restaurant_name:{
        type : String
    },
    restaurant_zip:{
        type : Number
    },
    address:{
        type : String
    },
    cuisine:{
        type: String
    },
    imagelocation:{
        type: String
    }
},{ collection: 'User' })
module.exports = mongoose.model('User', User);