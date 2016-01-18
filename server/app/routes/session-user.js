var router = require('express').Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ShoppingCart = mongoose.model('ShoppingCart');

module.exports = router;

router.post('/new-cart/:id', function(req, res, next){
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
router.post('/add-to-cart/:cartId', function(req, res, next){

    ShoppingCart.findOne({ _id: req.params.cartId })
        .then(cart => {
            cart.items.push(req.body);
            return cart.save();
        })
        .then(updatedCart => res.status(200).send(updatedCart))
        .then(null, next);
});
