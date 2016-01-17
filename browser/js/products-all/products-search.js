app.config(function($stateProvider) {
    $stateProvider.state('products-search', {
        url:'/products/:searchQuery',
        templateUrl: 'js/products-all/products-search.html',
        controller: function($scope, products, $stateParams) {
            $scope.products = products; 
            $scope.searchQuery = $stateParams.searchQuery;  
        },
        resolve: {
            products: function($http, ProductsFactory) {
                return ProductsFactory.fetchAll();
            }
        }
    });
});



