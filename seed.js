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
var Review = Promise.promisifyAll(mongoose.model('Review'));
var ShoppingCart = Promise.promisifyAll(mongoose.model('ShoppingCart'));

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
        tags: ['rug', 'cute'],
        reviews: ["5696844abf2de4ad6c740107", "5696844abf2de4ad6c740108"]
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
        tags: ['bed', 'utile'],
        reviews: ['56967b3903d8b51b27771d4d']
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
var seedReviews = function() {

    var reviews = [
        {
        text: 'Kinda disappointing',
        stars: 4,
        user: '56957789130e61b223dd4e7a',
        product: '569585a718e0a3955bdca5ae'
       },
        {
        text: 'So awesome',
        stars: 5,
        user: '56957789130e61b223dd4e84',
        product: '569585a718e0a3955bdca5ae'
       }
       ]
    return Review.createAsync(reviews);

};

var seedCart = function() {
    var cart = [
        {
            items: [
                {
                    //kitty rug
                    quantity: 5,
                    price: 25,
                    item: '569585a718e0a3955bdca5ae'
                },
                {
                    quantity: 3,
                    price: 5,
                    item: '569585a718e0a3955bdca5af'
                },
            ]
        },
        {
            items: [
                {   //cat furniture
                    quantity: 3,
                    price: 25,
                    item: '569585a718e0a3955bdca5b0'
                },
                {   //cat leggings
                    quantity: 2,
                    price: 100,
                    item: '569585a718e0a3955bdca5b1'
                }
            ]
        }
        ]
    return ShoppingCart.createAsync(cart);

}


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
    Product.findAsync({}).then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be product data, exiting!'));
        }
    })
    .then(function () {
        console.log(chalk.green('Seeding products successful!'));
    }).catch(function (err) {
        console.error(err);
    })
})
.then(function(){
    Review.findAsync({}).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
        }
    })
    .then(function () {
        console.log(chalk.green('Seeding reviews successful!'));

    }).catch(function (err) {
        console.error(err);
    })
})
.then(function(){
    ShoppingCart.findAsync({}).then(function (cart) {
        if (cart.length === 0) {
            return seedCart();
        } else {
            console.log(chalk.magenta('Seems to already be shopping cart data, exiting!'));
            process.kill(0);
        }
    })
    .then(function () {
        console.log(chalk.green('Seeding cart successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    })
})
