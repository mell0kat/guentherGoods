var router = require('express').Router();
var Product = require('mongoose').model('Product');

router.get('/', function(req, res, next ) {
    Product.find({})
    .then( products=> res.json(products))
});

router.get('categories/:category', function(req, res, next) {
    Product.find({ category: req.params.category })
    .then( productsInCategory => res.json(productsInCategory))
});

router.get('/detail/:productId', function(req, res, next) {
    Product.findById(req.params.productId)
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
