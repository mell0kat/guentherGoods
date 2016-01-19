app.config(function($stateProvider){
    $stateProvider.state('userProfile', {
        url: '/profile',
        templateUrl: 'js/user-page/user-page.html',
        controller: function($scope, AuthService, $state, user){
            $scope.user = user;
            $scope.goToUsers = function () {
                if ($scope.user.isAdmin) $state.go('userList');
                else $state.go('/');
            };
            $scope.goToProducts = function () {
                if ($scope.user.isAdmin) $state.go('products');
                else $state.go('/');
            };
            $scope.goToAddUsers = function() {
                if ($scope.user.isAdmin) $state.go('userAdd');
                else $state.go('/');
            };
            $scope.goToAddUsers = function() {
                if ($scope.user.isAdmin) $state.go('productCreate');
                else $state.go('/');
            };
        },
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});
