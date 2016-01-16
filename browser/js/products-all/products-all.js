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
            console.log(category, "cat ob")
            $scope.products = products;

            $scope.category = category;
            console.log($scope.category, "scope category")
        },
        resolve: {
            products: function($http, ProductsFactory) {
                return ProductsFactory.fetchAll();
            },
            category: function($http, ProductsFactory, $stateParams) {
                console.log($stateParams.category, "state params")
                return ProductsFactory.fetchACategory($stateParams.category);
            }
        }
    });
});
