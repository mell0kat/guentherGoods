var router = require('express').Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    ShoppingCart = mongoose.model('ShoppingCart'),
    Product = mongoose.model('Product');

var chalk = require('chalk');

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
    console.log(chalk.red.bold("item object request: ", req.body.item));

    var activeUser;
    User.findOne({ _id: req.params.userId })
        .then(user => {
            activeUser = user;
            return Product.findOne({ _id: req.body.item})
        })
        .then(product => {
            activeUser.shoppingCart.items.push({
                quantity: req.body.quantity,
                item: product
            });
            return activeUser.save();
        })
        .then(updatedUser => res.status(200).send(updatedUser))
        .then(null, next);
});
