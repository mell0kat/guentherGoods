app.factory('ShoppingCartFactory', function($http){
    var ShoppingCartFactory = {};

    ShoppingCartFactory.addToCart = function(cartId, itemInfo){
        return $http.post('/api/session-user/add-to-cart/' + cartId, itemInfo)
            .then(res => res.data);
    }

    return ShoppingCartFactory;
});