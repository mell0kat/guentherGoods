app.factory('ReviewsFactory', function($http) {
    var ReviewsFactory ={};

    ReviewsFactory.addReview = function(review, product) {
        // Note that the user is currently hard coded
       return $http.post('api/products/' +product._id +'/reviews', {
            text: review,
            product: product._id

       });
   };
   return ReviewsFactory;
});
