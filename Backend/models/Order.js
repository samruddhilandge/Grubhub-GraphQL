var mongoose =require('mongoose');
var Order = mongoose.Schema({
    restaurant_id:{
        type : String
     },
     restaurant_name:{
        type : String
     },
    buyer_id:{
        type: String
    },
    item_id:{
        type : String
    },
    item_name:{
        type : String
    },
    description:{
        type : String
    },
    section_name:{
        type: String
    },
    quantity:{
        type : Number
    },
    price:{
        type : String
    },
    total_price:{
        type : Number
    },
    status:{
        type : String
    },
    cuisine:{
        type : String
    },
    imagelocation:{
        type : String
    },
    imagename:{
        type : String
    },
    section_id:{
        type : String
    },
    buyer_name:{
        type : String
    },
    buyer_address:{
        type : String
    },
    placed_order:{
        type: Boolean
    }

},{ collection: 'Order' })

module.exports = mongoose.model('Order', Order);