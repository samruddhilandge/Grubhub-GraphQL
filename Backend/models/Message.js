var mongoose =require('mongoose');
var Message = mongoose.Schema({
    restaurant_id:{
        type : mongoose.Schema.ObjectId
     },
    buyer_id:{
        type: mongoose.Schema.ObjectId
    },
    message:{
        type:String
    },
    restaurant_name:{
        type:String
    },
    buyer_name:{
        type:String
    }
    ,
    isOwnerSender:{
        type:Boolean
    },
    isBuyerSender:{
        type:Boolean
    }

},{ collection: 'Message' })

module.exports = mongoose.model('Message', Message);