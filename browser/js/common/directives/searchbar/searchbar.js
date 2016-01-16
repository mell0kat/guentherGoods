app.directive('searchbar', function ($state, ProductsFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/searchbar/searchbar.html',
    };
});