var mongoose = require('mongoose');
var Schema=mongoose.Schema;
// Product Schema
var schema = mongoose.Schema({
   
    user:{
        type: Schema.Types.ObjectId, ref: 'User'
    },
    address: {
        type: String
    },
    amount: {
        type: Number
    },
    email:{
        type: String
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    cart:{
        type:Object
    },

});

module.exports = mongoose.model('Order', schema);