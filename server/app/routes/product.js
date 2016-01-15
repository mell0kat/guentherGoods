var router = require('express').Router();
var Product = require('mongoose').model('Product');
var Review = require('mongoose').model('Review');

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

router.get('/:productId', function(req, res, next) {
    Product.findById(req.params.productId)
    .populate('reviews')
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
    .then( createdProduct => res.status(201).json(createdProduct))
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
    Review.create(req.body)
    .then(function (review) {
        var reviewToAdd = review;
        return Product.findById(req.params.productId)
        .then(function(product) {
            product.reviews.push(reviewToAdd._id);
            return product.save();
        })
    })
    .then(function() {
        res.status(201).send('Review successfully posted! MEOW!');
    })
    .then(null, next);

});
