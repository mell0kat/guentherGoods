app.config(function($stateProvider) {
    $stateProvider.state('productDetail', {
        url: '/productDetail/:id',
        templateUrl: 'js/product-detail/product-detail.html',
        controller: function($scope, $state, $rootScope, product, user, $window, ReviewsFactory, ShoppingCartFactory) {
            $scope.product = product;
            $scope.shoppingCart = user.shoppingCart;
            $scope.user = user;
            $scope.order = {
                    quantity: 1,
                    item: product
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
            $scope.submitReview = function(reviewToAdd) {

                ReviewsFactory.addReview(reviewToAdd, $scope.user, $scope.product);
            };
            $scope.reviews = product.reviews.map(function(review)  {
                return review.text;
            });

            $scope.addToCart = function(order){
                ShoppingCartFactory.addToCart(user._id, order)
                    .then(() => {
                        $scope.goBack();
                    });
            }

            $scope.editProd = function(productId) {
                $state.go('productEdit', {id: productId});
            }
        },
        resolve : {
            product: function($stateParams, ProductsFactory) {
                return ProductsFactory.fetchProductById($stateParams.id);
            },
            user: function(AuthService, UserFactory){
                return AuthService.getLoggedInUser()
                    .then(userData => {
                        if(!userData) return UserFactory.fetchGuestUser();
                        else return userData;
                    })
            }
        }
    });
});
