app.factory('ReviewsFactory', function($http) {
    var ReviewsFactory ={};

    ReviewsFactory.addReview = function(review, product) {
        // Note that the user is currently hard coded
        console.log(product, "product in reviews factory")
       return $http.post('api/products/' +product._id +'/reviews', {
            text: review,
            product: product._id

       })
       .then(function() {
           console.log("in success handler")
       })
   };
   return ReviewsFactory;
});
