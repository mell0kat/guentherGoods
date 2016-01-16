app.config(function($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/product-detail/product-detail.html',
        controller: function($scope, product, $window, ReviewsFactory) {
            $scope.product = product;

            $scope.order = {};
            $scope.goBack = function(){
                $window.history.back();
            }
            $scope.setTab = function(choice) {
                $scope.choice = choice;
            }
            $scope.addReview =function() {
                $scope.addReviewClicked = true;
            }
            $scope.submitReview = function() {
                ReviewsFactory.addReview($scope.review, product);
            }
            $scope.reviews = product.reviews.map(function(review)  {
                return review.text;
            })
        },
        resolve : {
            product: function($stateParams, ProductsFactory) {
                return ProductsFactory.fetchProductById($stateParams.id);
            }
        }
    });
});
