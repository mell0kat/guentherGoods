'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/users', require('./user'));
router.use('/products', require('./product'));
router.use('/carts', require('./cart'));
router.use('/session-user', require('./session-user'));
router.use('/orders', require('./order'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
