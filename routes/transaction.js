var express = require('express');
var router = express.Router();

// Get User model
var User = require('../models/user');

// Get Transaction model
var Transaction = require('../models/transaction');


router.get('/order',function(req,res){


    res.render('transaction', {
        title: 'Order Process'
    });

router.post('/order',function(req,res){

    var customerid=req.body.customerid;
    var address=req.body.address;
    var amount=req.body.amount;
    var email=req.body.email;
    var name=req.body.name;
    var phone=req.body.phone;

    req.checkBody('address', 'Address is required!').notEmpty();
    req.checkBody('phone', 'Phone Number is required!').notEmpty();
    req.checkBody('email', 'Email is required!').isEmail();
    req.checkBody('Order name', 'Order Name is required!').notEmpty();
    req.checkBody('phone', 'Phone Number is required!').notEmpty();
    var errors = req.validationErrors();
    var transaction=new Transaction({
        customerid: customerid,
        address:address,
        amount:amount,
        email:email,
        name:name,
        phone:phone
        });
    transaction.save(function (err) {
        if (err)
        return console.log(err);
        });
})});
module.exports=router;