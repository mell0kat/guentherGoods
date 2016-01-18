var router = require('express').Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ShoppingCart = mongoose.model('ShoppingCart');

module.exports = router;

router.post('/new-user/:id', function(req, res, next){
    //:id of the user

    var newCart;

    ShoppingCart.create({ items: [] })
        .then(createdCart => {
            newCart = createdCart;
            return User.findOne({ _id: req.params.id })
        })
        .then(user => {
            user.shoppingCart = newCart;
            return user.save();
        })
        .then(user => res.status(200).send(user))
        .then(null, next);
});
router.post('/add-to-cart/:userId', function(req, res, next){

    User.findOne({ _id: req.params.userId })
        .then(user => {
            console.log(user.shoppingCart.items);
            user.shoppingCart.items.push(req.body);
            return user.save();
        })
        .then(updatedUser => res.status(200).send(updatedUser))
        .then(null, next);
});
