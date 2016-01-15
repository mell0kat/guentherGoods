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

    ProductsFactory.createOne = function(product) {
        return $http.post('/api/products', product)
        .then(function(response){
            console.log(response.data)
        })
    }
    return ProductsFactory;

})



