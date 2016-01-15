app.config(function($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/product-detail/product-detail.html',
        controller: function($scope, product, $window) {
            $scope.product = product;
            $scope.order = {};
            $scope.goBack = function(){
                $window.history.back();
            }
        },
        resolve : {
            product: function($stateParams, ProductsFactory) {
                return ProductsFactory.fetchProductById($stateParams.id);
            }

        }
    });
});
