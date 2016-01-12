'use strict';

var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    items: [{
        quantity: {
            type: Number
        },
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

cartSchema.methods.addToCart = function(item) {
    this.items.push(item);
};
// complete methods for adding to cart
// (.addToSet method??? look it up)
// need methods for updating inventory upon adding items

mongoose.model('ShoppingCart', cartSchema);
