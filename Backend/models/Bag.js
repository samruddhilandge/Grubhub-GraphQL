var mongoose =require('mongoose');
var Bag = mongoose.Schema({
    restaurant_id:{
        type : mongoose.Schema.ObjectId
     },
    //  restaurant_name:{
    //     type : String
    //  },
    buyer_id:{
        type: mongoose.Schema.ObjectId
    },
    item_id:{
        type : mongoose.Schema.ObjectId
    },
    item_name:{
        type : String
    },
    
    quantity:{
        type : Number
    },
    price:{
        type : Number
    },
    total_price:{
        type : Number
    }

},{ collection: 'Bag' })

module.exports = mongoose.model('Bag', Bag);