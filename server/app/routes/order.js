var User = require('mongoose').model('User');
var Order = require('mongoose').model('Order');
var router = require('express').Router();

router.post('/', function(req, res, next) {
    var orderToSend;
    Order.create(req.body.order)
    .then(createdOrder => {
        orderToSend = createdOrder;
        return User.findOne({ _id: req.body.user._id })
    })
    .then(foundUser => {
        foundUser.history.push(orderToSend);
        foundUser.shoppingCart = {items: []};
        return foundUser.save();
    })
    .then(() => res.status(201).send(orderToSend))
    .then(null, function(error){
        error.status = 400;
        next(error);
    });
})

module.exports = router;
