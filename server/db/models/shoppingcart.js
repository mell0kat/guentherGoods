'use strict';

var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    items: [{
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number
        },
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});


cartSchema.methods.addToCart = function(item) {
    this.items.push(item);
    this.save();
};

cartSchema.methods.updateQuantity = function(item, newQuantity) {
    this.items[item].quantity = newQuantity;
    this.save();
};

cartSchema.methods.removeItem = function(item) {
    var idx = this.items.indexOf(item);
    this.items.splice(idx, 1);
    this.save();
};

cartSchema.methods.checkoutCart = function() {

};

cartSchema.virtual('totalPrice').get(function() {
    var total = 0;
    this.items.forEach(function(item) {
        total += (item.price * item.quantity);
    });
    return total;
});

// need methods for updating inventory upon adding items

mongoose.model('ShoppingCart', cartSchema);
