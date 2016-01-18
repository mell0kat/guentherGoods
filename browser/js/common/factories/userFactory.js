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

    UserFactory.register = function(newUserInfo) {
        return $http.post('/api/users', newUserInfo)
        .then(function(response) {
            return response.data;
        });
    };
    UserFactory.createNewCart = function(id) {
        // takes a user ID
        return $http.post('/api/session-user/new-cart/' + id);
    }

    return UserFactory;
});
