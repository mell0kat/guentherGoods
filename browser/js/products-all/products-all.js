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

app.config(function($stateProvider) {
    $stateProvider.state('productsByCategory', {
        url:'/products/:category',
        templateUrl: 'js/products-all/products-all.html',
        controller: function($scope, products, category) {
            $scope.products = products;
            $scope.category = category;
        },
        resolve: {
            products: function($http, ProductsFactory) {
                return ProductsFactory.fetchAll();
            },
            category: function($http, ProductsFactory, $stateParams) {
                return ProductsFactory.fetchACategory($stateParams.category);
            }
        }
    });
});
