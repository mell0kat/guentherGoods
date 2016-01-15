app.factory('ProductsFactory', function ($http) {

	var ProductsFactory = {};

    ProductsFactory.fetchProductById = function(id){
        $http.get('/api/products/' + id)
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
            return response.data;
        })
    };

    ProductsFactory.fetchCategories = function() {
        return $http.get('/api/products/categories')
        .then(function(response){
            return response.data;
        })
    }
    return ProductsFactory;

});

