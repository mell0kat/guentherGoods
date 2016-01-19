app.config(function($stateProvider) {
    $stateProvider.state('productEdit', {
        url: '/product/edit/:id',
        templateUrl: 'js/product-edit/product-edit.html',
        controller: function($scope, product, user) {
            $scope.product = product;
            $scope.user = user;


        },
        resolve : {
            product: function($stateParams, ProductsFactory) {
                return ProductsFactory.fetchProductById($stateParams.id);
            },
            user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                    .then(userData => {
                        if(!userData) return UserFactory.fetchGuestUser();
                        else return userData;
                    })
            }
        }
    });
});
