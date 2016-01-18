app.factory('ShoppingCartFactory', function($http){
    var ShoppingCartFactory = {};

    ShoppingCartFactory.addToCart = function(cartId, itemInfo){
        return $http.post('/api/session-user/add-to-cart/' + cartId, itemInfo)
            .then(res => res.data);
    }
    ShoppingCartFactory.fetchCart = function(cartId) {
        console.log("in shopping factory")
        return $http.get('/api/carts/' + cartId)
        .then(function(response) {
            console.log(response.data, "response.data")
            return response.data})
    }

    return ShoppingCartFactory;
});
