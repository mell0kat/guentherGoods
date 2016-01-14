app.config(function($stateProvider) {
    $stateProvider.state('userList', {
        templateUrl: '/js/user-list/userlist.html',
        url: '/userlist/',
        controller: function($scope, users){
            $scope.users = users;
        },
        resolve: {
            user: function(UserFactory, $stateParams){
                return UserFactory.fetchAll();
            }
        }

    });
});
