var router = require('express').Router();
var User = require('mongoose').model('User');

router.get('/user/:id', function(req, res, next) {
    User.findOne({ _id: req.params.id })
    .then(function(user) {
        if (!user)  res.status(404).send('User not found!');
        res.send(user);
    })
    .then(null, next);
});

router.post('/user', function(req, res, next) {
    User.create(req.body)
    .then(createdUser => res.status(201).send('User was created \n' + createdUser))
    .then(null, next);
});

router.put('/user/:id', function(req, res, next) {
    User.update({ _id: req.params.id }, req.body, { upsert:true })
    .then(updatedUser => res.status(200).send('User successfully updated \n' + updatedUser))
    .then(null, next);
});

router.delete('/user/:id', function(req, res, next) {
    User.remove({ _id: req.params.id })
    .then(deletedUser => res.status(200).send('User successfully deleted \n' + deletedUser))
    .then(null, next);
})
