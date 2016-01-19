app.config(function($stateProvider){
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: function($scope, AuthService, user){
            AuthService.getLoggedInUser()
                .then(user => console.log("[browser/js/cart.js] user: ", user));
            $scope.user = user;
        },
        resolve: {
            user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                    .then(userData => {
                        if(!userData) return UserFactory.fetchGuestUser();
                        else return userData;
                    })
            }
        }
    });
});