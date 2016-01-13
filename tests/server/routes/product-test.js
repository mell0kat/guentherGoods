// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Product Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    // describe('Unauthenticated request', function () {

    //     var guestAgent;

    //     beforeEach('Create guest agent', function () {
    //         guestAgent = supertest.agent(app);
    //     });

    //     it('should get a 401 response', function (done) {
    //         guestAgent.get('/api/members/secret-stash')
    //             .expect(401)
    //             .end(done);
    //     });

    // });

    describe('Product route', function () {
        var productRoutes;
        var productId;
        var secondProductId;

        var productInfo = {
            name: 'kittyRug',
            price: 25,
            category: 'home-goods',
            description: 'a soft place to stand',
            quantity: 5,
            tags: ['rug', 'cute'],
            reviews: ['56967b3903d8b51b27771d4d']
        }
        var secondProductInfo = {
            name: 'catmug',
            price: 5,
            category: 'Office',
            description: 'ncahhdhf',
            quantity: 3,
            tags: ['mug', 'cute']
        }

        beforeEach('Create a product', function (done) {
            Product.create(productInfo)
            .then(function(product) {
                productId = product._id;
                return Product.create(secondProductInfo)
            }).then(function(product) {
                done();
            })
            productRoutes = supertest.agent(app);
        });


        it('should get all products in an array with 200 response', function (done) {
            productRoutes.get('/api/products')
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.equal(2);
                done();
            });
        });

        it('should get all products in a category in an array with 200 response', function (done) {
            productRoutes.get('/api/products/categories/home-goods')
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('array');
                done();
            });
        });

        it('should return 404 status code if invalid product requested', function (done) {
            productRoutes.get('/api/products/detail/' + '2387498jndfegjbsdf')//'5696c7e6f5a201cd7c2aab59')
            .expect(404)
            .end(function (err, response) {
                if (err) throw new Error(err);
                done();
            });
        });

        it('should get a single product with a 200 response', function (done) {
            productRoutes.get('/api/products/detail/' + productId)
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                expect(response.body.name).to.equal('kittyRug');
                done();
            });
        });


        it('should create a single product with a 201 response', function (done) {
            productRoutes
            .post('/api/products/')
            .send({
                name: 'catLeggings',
                price: 100,
                category: 'Apparel',
                description: 'super chic',
                quantity: 1,
                tags: ['fetch']
            })
            .expect(201)
            .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                expect(response.body.name).to.equal('catLeggings');
                done();
            });
        });

        it('should edit a single product with a 200 response', function (done) {
            productRoutes
            .put('/api/products/detail/' + productId)
            .send({
                name: 'catCarpet',
                price: 134123889,
                category: 'home-goods',
                description: 'a soft place to stand',
                quantity: 1,
                tags: ['fetch']
            })
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);
                expect(response.body).to.be.an('object');
                expect(response.body.ok).to.equal(1);
                productRoutes.get('/api/products/detail/'+productId)
                    .end(function(err, response) {
                        expect(response.body.name).to.equal('catCarpet');
                        done();
                    });

            });
        });

    });

});
