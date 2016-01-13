app.config(function($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/product-detail/product-detail.html',
        controller: function($scope, product) {
            $scope.product = product;
            $scope.order = {};
        },
        resolve : {
            product: function($http, $stateParams, ProductsFactory) {
                return ProductsFactory.fetchProductById($stateParams.id)
            }

        }
    });
});
