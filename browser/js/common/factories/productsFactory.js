app.factory('ProductsFactory', function ($http) {
	var ProductsFactory = {};
	
    ProductsFactory.fetchProductById = function(id){
        $http.get('/api/products/detail/' + id)
        .then(function(response){
            return response.data;
        })
    }
    return ProductsFactory;
})


