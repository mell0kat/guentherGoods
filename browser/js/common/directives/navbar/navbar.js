app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, UserFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Accessories', state: 'accessories' },
                { label: 'Apartment', state: 'apartment' },
                { label: 'Clothing', state: 'clothing' },
                { label: 'Bookstore', state: 'bookstore' },
                { label: 'For your Cat', state: 'forYourCat'}
            ];

            scope.goToCart = function() {
                $state.go('cart');
            };

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            scope.search = function (str){
                var searchQuery = str;
                $state.go('productsSearch',{searchQuery: searchQuery});
            }

            var setUser = function () {
                AuthService.getLoggedInUser()
                    .then(function (user) {
                        if(!user) return UserFactory.fetchGuestUser();
                        else return user;
                    })
                    .then(finalUser => {
                        scope.user = finalUser;
                    });

            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
