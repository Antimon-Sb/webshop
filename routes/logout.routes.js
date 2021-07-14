const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    // - obrisati sadržaj košarice
    req.session.cart = undefined;
    // - odjaviti registriranog korisnika iz sustava
    req.session.user = undefined;
    req.session.form = undefined;
    // - napraviti redirect na osnovnu stranicu
    res.redirect('/');

});

module.exports = router;