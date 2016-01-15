app.config(function($stateProvider) {
    $stateProvider.state('userList', {
        templateUrl: '/js/user-list/userlist.html',
        url: '/userlist',
        controller: function($scope, allUsers){
            $scope.allUsers = allUsers;
        },
        resolve: {
            allUsers: function(UserFactory){
                return UserFactory.fetchAll();
            }
        }
    });
});
