const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    // prikaz košarice uz pomoć cart.ejs
    res.render('cart', {
        title: 'Cart',
        user: req.session.user,
        linkActive: 'cart',
        cart: req.session.cart,
        err: undefined
    });
});


router.get('/add/:id', function (req, res, next) {
    //dodavanje jednog artikla u košaricu
    (async () => {
        if(req.session.cart === undefined || req.session.cart.invalid == true) {
            req.session.cart = cart.createCart();
            req.session.cart.invalid = false;
        }
        var id = req.params.id;
        await cart.addItemToCart(req.session.cart, id, 1);
        res.status(200).end();
    })();


});

router.get('/remove/:id', function (req, res, next) {
    (async () => {
        var id = req.params.id;
        await cart.removeItemFromCart(req.session.cart, id, 1);
        res.status(200).end();
    })();



});

module.exports = router;