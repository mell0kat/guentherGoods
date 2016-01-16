app.factory('ProductsFactory', function ($http) {

	var ProductsFactory = {};

   ProductsFactory.tagsParser = function(string) {
        return string.split(",");
    };

    ProductsFactory.fetchProductById = function(id){

        return $http.get('/api/products/' + id)
        .then(function(response){
            return response.data;
        });
    };

    ProductsFactory.fetchAll = function(){
        return $http.get('/api/products')
         .then(function(response){
            return response.data;
        });
    };

    ProductsFactory.createOne = function(product) {
        return $http.post('/api/products', product)
        .then(function(response){
            return response.data;
        })
    };

    ProductsFactory.fetchCategories = function() {
        return $http.get('/api/products/categories')
        .then(function(response){
            return response.data;
        })
    }

    ProductsFactory.fetchACategory = function (categoryName) {
        return $http.get('/api/products/categories')
        .then(function(response){
            //This will look for the category by this name and return the object
            return response.data.filter(function(categoryObject){
                return (categoryObject.name === categoryName)
            });

        })
    }
    ProductsFactory.fetchReviewsForProduct = function(productId) {
        console.log("in fetch review")
        return $http.get('api/products/'+ productId +'/reviews')
        .then(function(reviews) {
            return reviews.populate();
        })
        .then(function(populated) {
            console.log('populatedReviews');
        })
            // console.log("console logging for right now", reviews.data)
            // return reviews.data.map(function(review) {
            //     return review.text;
            // });
    }
    return ProductsFactory;

});

