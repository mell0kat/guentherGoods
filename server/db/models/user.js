var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var Product = require('./product');
//var Shopp require('./shoppingcart');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var ShoppingCartSchema = require('./shoppingcart').cart,
    ProductSchema = require('./product').product;

var UserSchema = new Schema({
    email: { type: String,
            unique: true,
            validate: {
                validator: function(e) {
                    //Regex to check for valid email
                    return (/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(e);
                }
            }
    },
    password: { type: String },
    name: { type: String },
    salt: { type: String },
    google: { id: String },
    isSeller: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isGuest: Boolean,
    cookie: String,
    shoppingCart: {
        type: ShoppingCartSchema,
        default: {
            items: [ProductSchema],
        }
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    history: [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    // TODO [time permitting] - History, Wishlist prop., Inbox

    address: { street1: {type: String},
            street2: {type: String},
            city: {type: String},
            state: {type: String},
            zip: {type: String},
            country: {type: String}
            },
    sellerProfile: [{type: Schema.Types.ObjectId, ref: 'Product'}]

});

UserSchema.plugin(deepPopulate);
// addToHistory also empties out the shopping cart (creates a new empty cart)
UserSchema.methods.addToHistory = function(orderId){
    var thisUser = this;
    thisUser.history.push(orderId);
    ShoppingCart.create({}).then(newCart => {
        thisUser.shoppingCart = newCart;
        return thisUser.save();
    });

};

// method to remove sensitive information from user objects before sending them out
UserSchema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

UserSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    if (this.isGuest) {
        this.email = "test" + Math.random() + "@gmail.com";
    }
    next();

});



UserSchema.statics.generateSalt = generateSalt;
UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', UserSchema);
