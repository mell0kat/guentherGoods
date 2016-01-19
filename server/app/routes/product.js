var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');
var Category = require('mongoose').model('Category');
var User = require('mongoose').model('User');
var deepPopulate = require('mongoose-deep-populate')(require('mongoose'));



module.exports = router;

router.get('/', function(req, res, next) {
    Product.find({})
    .then( products=> res.json(products))
    .then(null, next);
});

router.get('/categories/:category', function(req, res, next) {
    Product.find({ category: req.params.category })
    .then( productsInCategory => res.json(productsInCategory))
    .then(null, next);

});

router.get('/categories', function(req, res, next) {
    Category.find({})
    .then( categoriesFound => res.json(categoriesFound) )
    .then(null, next)
});

router.get('/:productId', function(req, res, next) {
    Product.findById(req.params.productId)
    .deepPopulate('reviews.user.email')
    .then( product => {
        if (!product) res.sendStatus(404);
        else res.json(product);
    }).then(null, function(err) {
        err.status = 404;
        next(err);
    });
});

router.post('/', function(req, res, next) {
    Product.create(req.body)
    .then( createdProduct => {
        if (createdProduct.seller) {
            User.findById(createdProduct.seller._id)
            .then(function(foundUser){
                foundUser.sellerProfile.products.push(createdProduct._id);
            })
        }
        res.status(201).json(createdProduct)
    })
    .then(null, next);
});

router.put('/:productId', function(req, res, next) {
    Product.update( { _id: req.params.productId }, req.body, { upsert: true})
    .then( updatedProduct => res.json(updatedProduct))
    .then(null, next);
});

router.delete('/:productId', function(req, res, next) {
    Product.remove( { _id: req.params.productId })
    .then( () => res.status(204).send('Product successfully deleted! MEOW!'))
    .then(null, next);
});


router.post('/:productId/reviews', function(req, res, next) {
    var reviewToAdd;
    Review.create(req.body)
    .then(function (review) {
        reviewToAdd = review;
        return Product.findOne({_id: req.params.productId})
        .then(function(product) {
            product.reviews.push(reviewToAdd._id);
            return product.save();
        })
        .then(function() {
            return User.findOne({_id: review.user})
            .then(function(user) {
                user.reviews.push(reviewToAdd._id);
                return user.save();
            })
        })
    })
    .then(function() {
        res.status(201).send('Review successfully posted! MEOW!');
    })
    .then(null, next);
});

