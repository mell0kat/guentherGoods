/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));

var seedUsers = function () {

    var users = [
        {
            username: 'testing@fsa.com',
            password: 'password',
            name: 'Mr. Test'
        },
        {
            username: 'obama@gmail.com',
            password: 'potus',
            name: 'You know me'
        },
        {
            username: 'hello@gmail.com',
            password: 'hello',
            name: 'Katherine'
        },
        {
            username: 'me@gmail.com',
            password: 'mememe',
            name: 'Nick'
        },
        {
            username: 'joe@fsa.org',
            password: 'puppyBowl',
            name: 'Joe dot JS',
            isAdmin: true
        },
        {
            username: 'mrrobot@gmail.com',
            password: '123456seven',
            name: 'Dave'
        },
        {
            username: 'walmart@gmail.com',
            password: 'walmart',
            name: 'Wally World',
            isSeller: true
        },
        {
            username: 'god@gmail.com',
            password: 'holyghost',
            name: 'Jesus',
            isSeller: true,
            isAdmin: true
        },
        {
            username: 'mum@gmail.com',
            password: 'sunshine',
            name: 'Teresa'
        },
        {
            username: 'cup@gmail.com',
            password: 'coffee',
            name: 'Coffee Cup'
        },
        {
            username: 'chocolateraspberries@gmail.com',
            password: 'yumyum',
            name: 'Zeus'
        }
    ];
    return User.createAsync(users);
};
var seedProducts = function() {

    var products = [
        {
        name: 'kittyRug',
        price: 25,
        category: 'Home Goods',
        description: 'a soft place to stand',
        quantity: 5,
        tags: ['rug', 'cute']
       },
        {name: 'catmug',
        price: 5,
        category: 'Office',
        description: 'ncahhdhf',
        quantity: 3,
        tags: ['mug', 'cute']
       },
        {name: 'cat furniture',
        price: 25,
        category: 'Home Goods',
        description: 'a sddf',
        quantity: 5,
        tags: ['bed', 'utile']
       },
        {name: 'catLeggings',
        price: 100,
        category: 'Apparel',
        description: 'super chic',
        quantity: 1,
        tags: ['fetch']
       }
       ]
    return Product.createAsync(products);

};

connectToDb.then(function () {
    return User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
        }
    })
    .then(function () {
        console.log(chalk.green('Seeding users successful!'));
        // process.kill(0);
    }).catch(function (err) {
        console.error(err, 'you have an error');
        // process.kill(1);
    })
})
.then(function(){
    console.log("hi");
    Product.findAsync({}).then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be product data, exiting!'));
            process.kill(0);
        }
    })
    .then(function () {
        console.log(chalk.green('Seeding products successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    })
})
