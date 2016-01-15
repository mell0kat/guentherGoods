app.config(function($stateProvider) {
    $stateProvider.state('productCreate', {
        url:'/products/create',
        templateUrl: 'js/product-add/product-add.html',
        controller: function($scope, products) {
            $scope.createdProduct = createdProduct;
        },
        resolve: {
            createdProduct: function($http, ProductsFactory) {
                return ProductsFactory.createOne();
            }
        }
    });
});
