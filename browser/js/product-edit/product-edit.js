app.config(function($stateProvider) {
    $stateProvider.state('productEdit', {
        url: '/product/edit/:id',
        templateUrl: 'js/product-edit/product-edit.html',
        controller: function($scope, $state, product, user, categories, ProductsFactory) {
            $scope.product = product;
            $scope.user = user;
            $scope.categories = categories;
            $scope.message;
            var redirect = function () {
                $state.go('productDetail', {id: product._id});
            };
            $scope.updateOne = function(product) {
                if (typeof product.tags === 'string') product.tags = ProductsFactory.tagsParser(product.tags);
                product.category = product.category._id;
                if (!$scope.user.isAdmin) product.seller = $scope.user._id;

                return ProductsFactory.updateOne(product)
                .then(function(createdProduct){
                    $scope.message = "product successfully updated! Redirecting in 5 seconds!";
                    $scope.addAProduct.$setPristine();
                    setTimeout(redirect, 5000);
                });
            }


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
            },
            categories: function($http, ProductsFactory) {
                return ProductsFactory.fetchCategories();
            }
        }
    });
});
