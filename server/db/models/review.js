'use strict';

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    text:  {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    stars: {
        type: Number
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


mongoose.model('Review', reviewSchema);
