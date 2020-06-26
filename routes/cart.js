var express = require('express');
var router = express.Router();
// Get Product model
var Product = require('../models/product');
var Order = require('../models/order');

/*
 * GET add product to cart
 */
router.get('/add/:product', function (req, res) {

    var slug = req.params.product;

    Product.findOne({slug: slug}, function (err, p) {
        if (err)
            console.log(err);

        if (typeof req.session.cart == "undefined") {
            req.session.cart = [];
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: parseFloat(p.price).toFixed(2),
                image: '/product_images/' + p._id + '/' + p.image
            });
        } else {
            var cart = req.session.cart;
            var newItem = true;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].title == slug) {
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }

            if (newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2),
                    image: '/product_images/' + p._id + '/' + p.image
                });
            }
        }

//        console.log(req.session.cart);
        req.flash('success', 'Product added!');
        res.redirect('back');
    });

});

/*
 * GET checkout page
 */
router.get('/checkout', function (req, res) {

    if (req.session.cart && req.session.cart.length == 0) {
        delete req.session.cart;
        res.redirect('/cart/checkout');
    } else {
        res.render('checkout', {
            title: 'Checkout',
            cart: req.session.cart
        });
    }

});

/*
 * GET update product
 */
router.get('/update/:product', function (req, res) {

    var slug = req.params.product;
    var cart = req.session.cart;
    var action = req.query.action;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].title == slug) {
            switch (action) {
                case "add":
                    cart[i].qty++;
                    break;
                case "remove":
                    cart[i].qty--;
                    if (cart[i].qty < 1)
                        cart.splice(i, 1);
                    break;
                case "clear":
                    cart.splice(i, 1);
                    if (cart.length == 0)
                        delete req.session.cart;
                    break;
                default:
                    console.log('update problem');
                    break;
            }
            break;
        }
    }

    req.flash('success', 'Cart updated!');
    res.redirect('/cart/checkout');

});

/*
 * GET clear cart
 */
router.get('/clear', function (req, res) {

    delete req.session.cart;
    
    req.flash('success', 'Cart cleared!');
    res.redirect('/cart/checkout');

});
/*
 * GET buy now
 */
router.get('/buynow', function (req, res) {

    delete req.session.cart;
    res.redirect("/paytm/payment");

});

/*
 * GET register
 */
router.get('/checkout/order', function (req, res) {

    res.render('transaction', {
        title: 'Order'
    });
});

router.post('/checkout/order', function (req, res) {
    var cart = req.session.cart;
    var order=new Order({
        user:req.user,
        cart: cart,
        address:req.body.address,
        email:req.body.email,
        name:req.body.name,
        phone:req.body.phone,
    });
    order.save(function (err) {
        if (err)
            return console.log(err);
        req.session.cart=null;
        res.redirect("/cart/order-placed");
});
});
router.get('/order-placed', function (req, res) {
    req.session.cart=null;
    delete req.session.cart;
    res.render('placed', {
        title: 'Order Placed'
    });
});

// Exports
module.exports = router;


