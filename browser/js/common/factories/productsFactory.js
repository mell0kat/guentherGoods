app.factory('ProductsFactory', function ($http) {

    ProductsFactory.fetchProductById = function(id){
        $http.get('/api/products/detail/' + id)
        .then(function(response){
            return response.data;
        })
    }
    return ProductsFactory;
}


