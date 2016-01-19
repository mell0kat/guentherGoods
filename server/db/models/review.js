'use strict';

var mongoose = require('mongoose');
var User = require('./user');
var Product = require('./product');

var reviewSchema = new mongoose.Schema({
    text:  {
        type: String,
        required: true,
        minlength: 50
    },
    date: {
        type: Date,
        default: Date.now
    },
    stars: {
        type: Number,
        min: 0,
        max: 5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});


reviewSchema.pre('save', function (next) {
    User.findOne({_id: this.user})
    .then(function(foundUser) {
        foundUser.reviews.push(this._id);
        return foundUser.save();
    });
    next();
});
reviewSchema.pre('save', function (next) {
    Product.findOne({_id: this.product})
    .then(function(foundProduct) {
        foundProduct.reviews.push(this._id);
        return foundProduct.save();
    });
    next();
});


mongoose.model('Review', reviewSchema);
