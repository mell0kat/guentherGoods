app.config(function($stateProvider) {
    $stateProvider.state('userDetail', {
        templateUrl: '/js/user-detail/user-detail.html',
        url: '/userdetail/:id',
        controller: function($scope, $http, user){
            $scope.user = user;
            $scope.updateUser = function(toUpdate, data) {
                console.log(toUpdate)
                return $http.put('/api/users/'+ user._id, {[toUpdate]: data});
            };
            $scope.bool = [
            {value: true, text: "true"},
            {value: false, text: "false"}];
        },
        resolve: {
            user: function(UserFactory, $stateParams){
                return UserFactory.fetchUserById($stateParams.id);
            }
        }

    });
});
