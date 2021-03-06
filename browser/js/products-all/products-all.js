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

app.config(function($stateProvider) {
    $stateProvider.state('productsSearch', {
        url:'/products/search/:searchQuery',
        templateUrl: 'js/products-all/products-search.html',
        controller: function($scope, products, $stateParams) {
            $scope.matchedProducts = products.filter(function(item){
                var tags = item.tags.toString();
                return (item.name.match($stateParams.searchQuery) || item.description.match($stateParams.searchQuery) || tags.match($stateParams.searchQuery) )
            });
        },
        resolve: {
            products: function($http, ProductsFactory) {
                return ProductsFactory.fetchAll();
            }
        }
    });
});

// app.config(function($stateProvider) {
//     $stateProvider.state('similar', {
//         url:'/products/similar/:id',
//         templateUrl: 'js/products-all/products-search.html',
//         controller: function($scope, products, $stateParams) {
//             console.log("in the")
//             $scope.matchedProducts = products;
//         },
//         resolve: {
//             products: function($http, ProductsFactory, $stateParams) {
//                 return ProductsFactory.findSimilar($stateParams.id);
//             }
//         }
//     });
// });
