app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, UserFactory, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {
        $scope.error = null;
        UserFactory.register(signupInfo)
        .then(function (user) {
            return AuthService.login(signupInfo);
        },
        function() {
            $scope.error = 'Not valid. Please try again, MEOW!';
        })
        .then(function(user) {
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Credentials not valid. Try again.';
        });
    };
});
