'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var ShoppingCart = mongoose.model('ShoppingCart')
module.exports = router;


router.get('/', function(req, res, next){
    ShoppingCart.find({})
        .then(carts => res.status(200).send(carts))
        .then(null, next);
});

router.get('/:id', function( req, res, next){
    ShoppingCart.findOne({ _id: req.params.id })
        .then(cart => res.status(200).send(cart))
        .then(null, next);
});

router.post('/new', function(req, res, next){
    ShoppingCart.create()
        .then(newCart => res.status(200).send(newCart))
        .then(null, next);
});
