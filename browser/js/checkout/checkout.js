app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: function($scope, user, cart) {
            console.log($scope)
            $scope.user = user;
            $scope.cart = cart;
        },
        resolve: {
            user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                    .then(loggedInUser => {
                        if(!loggedInUser.shoppingCart) return UserFactory.createNewCart(loggedInUser._id);
                        else return loggedInUser;
                    })
            },
            cart: function(ShoppingCartFactory, user) {
                return ShoppingCartFactory.fetchCart(user.shoppingCart)
                .then(cart =>  cart)
            }
        }
    });
});
