'use strict';

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: [String]
        // enum: ['Apparel', 'Home Goods', 'Accessories', 'For Your Cat', 'Office', 'Misc.']
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    quantity: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        get: function(array) {
            return array.join(', ');
        }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

productSchema.virtual('inStock').get(function() {
    return this.quantity > 0;
});

productSchema.virtual('snippet').get(function() {
    return this.description.slice(0,23) + "...";
});

productSchema.statics.findByTag = function(tag) {
    return Product.find({
        tags: {
            $in: [tag]
        }
    }).exec();
};

productSchema.methods.findSimilar = function() {
    return Product.find({
        tags: {
            $in: this.tags
        },
        _id: {
            $ne: this._id
        }
    }).exec();
};

// add method for adding items for when a seller adds an item
// add method for updating inventory when user checks out

mongoose.model('Product', productSchema);
