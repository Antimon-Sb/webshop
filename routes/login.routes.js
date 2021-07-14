const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');


router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu
    var helpE = req.session.err;
    req.session.err = undefined;
    res.render('login', {
        title: 'Login',
        user: req.session.user,
        linkActive: 'login',
        err: helpE
    });
    req.session.err = undefined;


});

router.post('/', function (req, res, next) {
    (async () => {
        var tryingToLogInUser = await User.fetchByUsername(req.body.user);
        if(tryingToLogInUser.id === undefined || !tryingToLogInUser.checkPassword(req.body.password)) {
            res.render('login', {
                title: 'Home',
                user: req.session.user,
                linkActive: 'login',
                err: 'User does not exist or incorrect password.'
            });
            return;
        }


        req.session.user = tryingToLogInUser;
        res.redirect('/');
    })();


});



module.exports = router;