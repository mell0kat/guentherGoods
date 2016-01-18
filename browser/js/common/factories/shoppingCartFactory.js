app.factory('ShoppingCartFactory', function($http){
    var ShoppingCartFactory = {};

    ShoppingCartFactory.addToCart = function(userId, itemInfo) {
        return $http.post('/api/session-user/add-to-cart/' + userId, itemInfo)
            .then(res => res.data);
    };

    return ShoppingCartFactory;
});