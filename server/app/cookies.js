'use strict';
var router = require('express').Router(),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

    module.exports = router;

router.use(function(req, res, next){
    //create guest user based on cookie if no one is logged in.
    let cookie = req.cookies['connect.sid'];

    if(!req.session.passport.user){
        User.findOne({ cookie: cookie })
            .then(guestUser => {
                if (!guestUser) throw undefined;
                else return guestUser;
            })
            .then(null, () => {
                //create new guest user with unassigned cookie.
                return User.create({
                    name: "Guest",
                    cookie: cookie,
                    isGuest: true
                });
            })
            .then(confirmedGuestUser => {
                req.body.guestUser = confirmedGuestUser;
                next();
            })
            .then(null, next);
    }
    else next();
});

router.get('/guest', function(req, res){
    res.send(req.body.guestUser);
});