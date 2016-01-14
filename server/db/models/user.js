var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./product');
// require('./shoppingcart');

var SellerProfile = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    storeName: String
});
var UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true},
    name: { type: String, required: true},
    isSeller: Boolean,
    isAdmin: Boolean,
    shoppingCart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart'},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    history: [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    // TODO [time permitting] - History, Wishlist prop., Inbox
    sellerProfile: SellerProfile,
    address: String

});

// addToHistory also empties out the shopping cart (creates a new empty cart)
UserSchema.method.addToHistory = function(orderId){
    var thisUser = this;
    thisUser.history.push(orderId);
    ShoppingCart.create({}).then(newCart => {
        thisUser.shoppingCart = newCart;
        return thisUser.save();
    });

};

mongoose.model('User', UserSchema);
