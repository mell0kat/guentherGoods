var router = require('express').Router();
var User = require('mongoose').model('User');


// get all users
router.get('/', function(req, res, next) {
    User.find({})
        .then(function(users){
            res.status(200).send(users);
        });
});

// lookup a user's account
router.get('/:id', function(req, res, next) {
    User.findOne({ _id: req.params.id })
        .populate('reviews')
        .then(function(user) {
            if (!user) res.status(404).send('User not found!');
            else res.status(200).send(user);
        })
        .then(null, next);
});

// create a new user
router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(createdUser => res.status(201).send('User was created \n' + createdUser))
        .then(null, next);
});

// update an existing user
router.put('/:id', function(req, res, next) {
    User.update({ _id: req.params.id }, req.body, { upsert:true })
        .then(updatedUser => res.status(200).send('User successfully updated \n' + updatedUser))
        .then(null, next);
});

// delete a user
router.delete('/:id', function(req, res, next) {
    User.remove({ _id: req.params.id })
        .then(deletedUser => res.status(200).send('User successfully deleted \n' + deletedUser))
        .then(null, next);
});

module.exports = router;
