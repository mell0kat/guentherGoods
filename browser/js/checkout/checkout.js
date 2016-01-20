app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: function($scope, user) {

            $scope.user = user;
            console.log($scope, "SCOPE IN CHECKOUT")
            console.log($scope.user.shoppingCart, "SCOPE CART IN CHECKOUT")

        },
        resolve: {
            user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                    .then(loggedInUser => {
                         if(!loggedInUser) return UserFactory.fetchGuestUser();
                         return UserFactory.fetchUserById(loggedInUser._id)
                     })

            }
        }
    });
});
