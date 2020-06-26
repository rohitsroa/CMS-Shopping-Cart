var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
// Product Schema
var Transaction = mongoose.Schema({
   
    customerid:{
        type:String
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
        type:Number
    }
});
Transaction.plugin(autoIncrement.plugin, {
    model: 'Transactions',
    field:'customerid',
    prefix:'CUST_',
});

var Transaction = module.exports = mongoose.model('Transaction', Transaction);