app.factory('ShoppingCartFactory', function($http){
    var ShoppingCartFactory = {};

    ShoppingCartFactory.addToCart = function(userId, itemInfo) {
        return $http.post('/api/session-user/add-to-cart/' + userId, itemInfo)
            .then(res => res.data);
    };
    // ShoppingCartFactory.fetchCart = function(cart) {
    //     console.log("in shopping factory")
    //     return $http.get('/api/carts/' + cart._id)
    //     .then(function(response) {
    //         console.log(response.data, "response.data")
    //         return response.data})
    //     };

    // };


    return ShoppingCartFactory;
});
