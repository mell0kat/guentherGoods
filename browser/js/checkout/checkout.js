app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: function($scope, user, UserFactory,  $state) {

            $scope.user = user;
            $scope.submitOrder = function(user) {
                return UserFactory.createNewOrder(user)
                .then(function(order){
                    console.log(order,"ORDER HERE")
                    $state.go('orderSubmitted');
                })
            }

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
