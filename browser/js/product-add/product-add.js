app.config(function($stateProvider) {
    $stateProvider.state('productCreate', {
        url:'/products/create',
        templateUrl: 'js/product-add/product-add.html',
        controller: function($scope, ProductsFactory) {
            $scope.create = function(product) {
               return ProductsFactory.createOne(product);
            }
        // resolve: {
        //     // createdProduct: function($http, ProductsFactory) {
        //     //     return ProductsFactory.createOne();
        //     }
        }
    });
});
