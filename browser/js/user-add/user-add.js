app.config(function($stateProvider) {
    $stateProvider.state('userAdd', {
        templateUrl: '/js/user-add/user-add.html',
        url: '/useradd',
        controller: function($scope, $http, UserFactory, $state){
            $scope.user = {};
            $scope.sendSignup = function (signupInfo) {
                UserFactory.register(signupInfo)
                .then(function (user) {
                    $state.go('userProfile');
                });
            };
        }
    });
});
