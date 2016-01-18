'use strict';

var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    shoppingCart:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingCart'
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type : String,
        enum: ['open', 'paid', 'shipped'],
        default: 'open'
    }
});

orderSchema.methods.markAsPaid = function () {
    this.status = 'paid';
    return this.save();
};

orderSchema.methods.markAsShipped = function () {
    this.status = 'shipped';
    return this.save();
};

// Order

// Orders must belong to a user OR guest session (authenticated vs unauthenticated)
// Orders must contain line items that capture the price, current product ID and quantity
// If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes

// after marking an order as paid we need to add it to that user's history
// we also need to empty the cart and update the inventory

mongoose.model('Order', orderSchema);

