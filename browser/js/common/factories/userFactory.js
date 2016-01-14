app.factory('UserFactory', function ($http) {

    UserFactory.fetchUserById = function(id){
        $http.get('/api/users/' + id)
        .then(function(response){
            return response.data;
        });
    };
    return UserFactory;
});
