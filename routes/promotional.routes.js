const express = require('express');
const router = express.Router();
const authHandler = require('./helpers/auth-handler');

router.get('/', authHandler, function (req, res, next){
    res.render('promotional',{
        title: 'Promotional',
        user: req.session.user,
        form: req.session.form !== undefined ? req.session.form:{
            'promo-type': undefined,
            'promo-code': undefined
        } ,
        linkActive: 'cart',
        err: undefined
    });
});

router.post( '/', authHandler, function (req, res, next){
    req.session.form = req.body;
    res.redirect('./cart');
});

router.post('/reset', authHandler, function (req, res, next){
    req.session.form = undefined;
    res.redirect('/promotional');
});

router.post('/order', function (req, res, next){
    req.session.form = undefined;
    res.redirect('/checkout');
});
module.exports = router;