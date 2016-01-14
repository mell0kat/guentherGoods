app.factory('UserFactory', function ($http) {
	var UserFactory = {};

    UserFactory.fetchUserById = function(id){
        return $http.get('/api/users/' + id)
        .then(function(response){
            return response.data;
        });
    };

    UserFactory.fetchAll = function() {
        return $http.get('/api/users/')
        .then(response => response.data);
    };
    return UserFactory;
});
