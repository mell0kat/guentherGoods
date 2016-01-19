app.factory('ReviewsFactory', function($http) {
    var ReviewsFactory ={};

    ReviewsFactory.addReview = function(review, user, product) {
        // Note that the user is currently hard coded
       return $http.post('api/products/' +product._id +'/reviews', {
            text: review.text,
            user: user._id,
            product: product._id,
            stars: review.stars

       });
   };
   return ReviewsFactory;
});
