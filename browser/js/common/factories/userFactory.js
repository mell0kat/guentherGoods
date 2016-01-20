app.factory('UserFactory', function ($http) {
	var UserFactory = {};

    UserFactory.fetchUserById = function(id){
        return $http.get('/api/users/' + id)
        .then(function(response){
            return response.data;
        });
    };

    UserFactory.fetchAll = function() {
        return $http.get('/api/users')
        .then(function(response) {
            return response.data;
        })
    };

    UserFactory.fetchGuestUser = function(){
        return $http.get('/guest')
            .then(guestRes => {
                console.log('session.guest,', guestRes);
                return guestRes.data
            });
    }
    UserFactory.register = function(newUserInfo) {
        return $http.post('/api/users', newUserInfo)
        .then(function(response) {
            return response.data;
        });
    };
    UserFactory.createNewCart = function(id) {
        // takes a user ID
        return $http.post('/api/session-user/new-cart/' + id);
    };

    UserFactory.fetchSellerProducts = function(id) {
        return $http.get('/api/products/seller/'+id)
        .then(function(response){
            return response.data;
        });
    };

    return UserFactory;
});
