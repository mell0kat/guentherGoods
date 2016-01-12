var mongoose = require('mongoose');

var Schema = new mongoose.Schema;

var SellerProfile = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    storeName: String
});
var UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true},
    name: { type: String, required: true},
    isSeller: Boolean,
    isAdmin: Boolean,
    shoppingCart: { type: Schema.Types.ObjectId, ref: 'ShoppingCart'},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    // TODO [time permitting] - History, Wishlist prop., Inbox
    sellerProfile: SellerProfile,
    address: String

});

User.method.addToHistory = function(orderId){
    var thisUser = this;
    thisUser.history.push(orderId);
    //ShoppingCart.create({}).then(newCart => thisUser.shoppingCart = newCart);
    return this.thisUser();
}

mongoose.model('User', UserSchema);
