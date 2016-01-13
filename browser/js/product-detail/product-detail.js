app.config(function($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/product-detail/product-detail.html',
        controller: function($scope, product) {
            $scope.product = product.data;
        },
        resolve : {
            product: function($http, $stateParams) {
                return $http.get('/api/products/detail/' + $stateParams.id)
            }

        }
    });
});
