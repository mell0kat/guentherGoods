app.config(function($stateProvider) {
    $stateProvider.state('productCreate', {
        url:'/products/create',
        templateUrl: 'js/product-add/product-add.html',
        controller: function($scope, ProductsFactory, categories) {
            $scope.categories = categories;
            console.log($scope.categories, "scope categories")
            $scope.create = function(product) {
                product.tags = ProductsFactory.tagsParser(product.tags);
                product.category = product.category._id;

               return ProductsFactory.createOne(product);
            }
        },
        resolve: {
            categories: function($http, ProductsFactory) {
                return ProductsFactory.fetchCategories();
            }
        }
    });
});
