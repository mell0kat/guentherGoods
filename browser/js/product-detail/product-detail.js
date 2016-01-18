app.config(function($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/product-detail/product-detail.html',
        controller: function($scope, product, user, $window, ReviewsFactory, ShoppingCartFactory, AuthService, $http) {

            $scope.product = product;
            $scope.shoppingCart = user.shoppingCart;

            $scope.order = {
                    quantity: 1,
                    item: product._id,
            };
            $scope.order.quantity = 1; //this will give a "default" value
            $scope.goBack = function(){
                $window.history.back();
            };
            $scope.setTab = function(choice) {
                $scope.choice = choice;
            };
            $scope.addReview =function() {
                $scope.addReviewClicked = true;
            };
            $scope.submitReview = function() {
                ReviewsFactory.addReview($scope.review, product);
            };
            $scope.reviews = product.reviews.map(function(review)  {
                return review.text;
            });

            $scope.addToCart = function(cartId, order){
                ShoppingCartFactory.addToCart(cartId, order)
                    .then(() => $scope.goBack());
            }
        },
        resolve : {
            product: function($stateParams, ProductsFactory) {
                return ProductsFactory.fetchProductById($stateParams.id);
            },
            user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                    .then(loggedInUser => {
                        if(!loggedInUser.shoppingCart) return UserFactory.createNewCart(loggedInUser._id);
                        else return loggedInUser;
                    })
            }
        }
    });
});
