app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, $http, UserFactory, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;
        UserFactory.register(signupInfo)
        .then(function () {
            $state.go('Login');
        }).catch(function () {
            $scope.error = 'Credentials not valid. Try again.';
        });
    };
});
