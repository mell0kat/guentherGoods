app.config(function($stateProvider) {
    $stateProvider.state('productCreate', {
        url:'/products/create',
        templateUrl: 'js/product-add/product-add.html',
        controller: function($scope, $state, user, ProductsFactory, categories) {
            $scope.categories = categories;
            $scope.message;
            $scope.user = user;
            $scope.create = function(product) {
                product.tags = ProductsFactory.tagsParser(product.tags);
                product.category = product.category._id;
                if (!$scope.user.isAdmin) product.seller = $scope.user._id;

                return ProductsFactory.createOne(product)
                .then(function(createdProduct){
                    // var id = createdProduct._id;
                    // var redirect = function() {
                    //     $state.go('productDetail', {id: id})
                    // };
                    $scope.message = "product successfully created! Redirecting soon. MEOW!";
                    $scope.addAProduct.$setPristine();
                    // setTimeout(redirect, 5000);

                });
            }

        },
        resolve: {
            categories: function(ProductsFactory) {
                return ProductsFactory.fetchCategories();
            },
            user: function(AuthService, UserFactory) {
                return AuthService.getLoggedInUser()
                .then(userData => {
                    return UserFactory.fetchUserById(userData._id);
                });
            }
        }
    });
});
