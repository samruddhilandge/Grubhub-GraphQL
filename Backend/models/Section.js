var mongoose =require('mongoose');
var Section = mongoose.Schema({
    restaurant_id:{
        type : mongoose.Schema.ObjectId
     },
    section_name:{
        type : String
    }

},{ collection: 'Section' })

module.exports = mongoose.model('Section', Section);