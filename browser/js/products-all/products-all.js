app.config(function($stateProvider) {
    $stateProvider.state('products', {
        url:'/products',
        templateUrl: 'js/products-all/products-all.html',
        controller: function($scope, products) {
            $scope.products = products;
        },
        resolve: {
            products: function($http, ProductsFactory) {
                return ProductsFactory.fetchAll();
            }
        }
    });
});
