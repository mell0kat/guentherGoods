app.config(function($stateProvider) {
    $stateProvider.state('userDetail', {
        templateUrl: '/js/user-detail/user-detail.html',
        url: '/userdetail/:id',
        controller: function($scope, user){
            $scope.user = user;
        },
        resolve: {
            user: function(UserFactory, $stateParams){
                return UserFactory.fetchUserById($stateParams.id);
            }
        }

    });
});
