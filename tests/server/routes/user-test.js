// Instantiate all models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');


beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
});

afterEach('Clear test responsebase', function (done) {
    clearDB(done);
});

describe('User routes', function () {

    var testUser1 = {
            name: 'Matthew Patel',
            email: 'EvilExNum1@gmail.com',
            password: 'hipsterdeamonchicks'
        },
        testUser2 = {
            name: 'Johnny Test',
            email: 'jtest@gmail.com',
            password: 'seesawyolo',
        },
        testUser1Id,
        invalidUser = {
            name: 'Donald Trump',
            password: 'trumpcard'
        };

    var userRoutes;

    beforeEach('Create a user', function (done) {
        User.create(testUser1)
            .then(createdUser => {
                testUser1Id = createdUser._id;
                return User.create(testUser2);
            })
            .then(() => {
                userRoutes = supertest.agent(app);
                done();
            });
    });

    it('gets all users with a 200 status', function (done) {
        userRoutes.get('/api/users/')
            .expect(200)
            .end(function (err, response) {
                if (err) done(err);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.equal(2);
                done();
            });
    });

    it('should get a single user', function (done) {
        userRoutes.get('/api/users/' + testUser1Id)
            .expect(200)
            .end(function (err, response) {
                console.log("RES:", response);
                console.log("ERR:",err);
                expect(response.body).to.be.an('object');
                expect(response.body.email).to.equal('EvilExNum1');
                expect(response.body.password).to.equal('hipsterdeamonchicks');
                done();
            });
    });

    it('should create a user', function(done){
        var newUserId;

        userRoutes.post('/api/users')
        .send({
            name: 'Julius Caesar',
            email: 'cantbestabbed',
            password: 'legioX'
        })
        .expect(201)
        .end(function(err, response){
            if (err) return done(err);
            expect(response.body._id).to.be.ok;
            newUserId = response.body._id;

            userRoutes.get('/api/users/' + newUserId)
            .expect(200)
            .end(function(err, response){
                expect(response.body._id).to.equal(newUserId);
                expect(response.body.name).to.equal('Julius Caesar');
                expect(response.body.email).to.equal('cantbestabbed');
                done();
            });
        });
    });

    it('should not create a user if validation fails', function(done){
        userRoutes.post('/api/users')
        .send(invalidUser)
        .expect(400)
        .end(function(err){
            if (err) throw new Error(err);
            done();
        });
    });

    it('can modify a user', function(done){
        userRoutes.put('/api/users/'+testUser1Id)
        .send({ name: 'Lucas Lee',
                email: 'EvilExNum2'
        })
        .expect(200)
        .end(function(err){
            if (err) throw new Error(err);
            User.findOne({ _id: testUser1Id} )
            .then(function(user){
                expect(user.name).to.equal('Lucas Lee');
                expect(user.email).to.equal('EvilExNum2');
                done();
            })
            .then(null, done);
        });
    });

    it('can delete a user', function(done){
        userRoutes.delete('/api/users/'+testUser1Id)
        .expect(204)
        .end(function(err, response){
            if(err) throw new Error(err);
            User.findOne({ _id: testUser1Id })
                .then(function(result){
                    expect(result).to.not.be.ok;
                    done();
                })
                .then(null, done);
        });
    });
});

