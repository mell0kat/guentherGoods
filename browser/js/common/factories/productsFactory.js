app.factory('ProductsFactory', function ($http) {

	var ProductsFactory = {};

    ProductsFactory.fetchProductById = function(id){
        return $http.get('/api/products/detail/' + id)
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

    ProductsFactory.createOne = function() {
        return $http.post('/api/products')
        .then(function(response){
            console.log(response.data)
        })
    }
    return ProductsFactory;

})



