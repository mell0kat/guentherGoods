var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');

module.exports = router;

router.get('/', function(req, res, next ) {
    console.log('hi');
    Product.find({})
    .then( products=> res.json(products))
});

router.get('/categories/:category', function(req, res, next) {
    Product.find({ category: req.params.category })
    .then( productsInCategory => res.json(productsInCategory))
});

router.get('/detail/:productId', function(req, res, next) {
    Product.findById(req.params.productId)
    .populate('reviews')
    .then( product => res.json(product) )
});

router.post('/detail/:productId', function(req, res, next) {
    Product.create(req.body)
    .then( createdProduct => res.json(createdProduct))
});

router.put('/detail/:productId', function(req, res, next) {
    Product.update( { _id: req.params.productId }, req.body, { upsert: true})
    .then( updatedProduct => res.json(updatedProduct))
});

router.delete('/detail/:productId', function(req, res, next) {
    Product.remove( { _id: req.params.productId })
    .then( deletedProduct => res.status(204).send('Product successfully deleted!'))
});

router.post('/detail/:productId/reviews', function(req, res, next) {
    Review.create(req.body)
    .then(function (review) {
        var review = review;
        return Product.findById(req.params.productId)
        .then(function(product) {
            product.reviews.push(review._id);
            return product.save();
        })
    })
    .then(function() {
        res.status(201).send('Review successfully posted!');
    })

})
