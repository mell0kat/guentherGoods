app.config(function($stateProvider){
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: function($scope, AuthService){
            AuthService.getLoggedInUser()
                .then(user => console.log("[browser/js/cart.js] user: ", user));
        }
    });
});