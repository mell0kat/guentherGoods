app.config(function($stateProvider) {
    $stateProvider.state('productCreate', {
        url:'/products/create',
        templateUrl: 'js/product-add/product-add.html',
        controller: function($scope, ProductsFactory, categories) {
            $scope.categories = categories;
            $scope.create = function(product) {
                console.log(product, "this is the product")
               return ProductsFactory.createOne(product);
            }
        },
        resolve: {
            categories: function($http, ProductsFactory) {
                console.log("in scope.categories")
                return ProductsFactory.fetchCategories();
            }
        }
    });
});
