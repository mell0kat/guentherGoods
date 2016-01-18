app.directive('productlisting', function ($state, ProductsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/product-listing/product-listing.html'
    };
});
