app.filter('filterByCategory', function() {
    //input needs to be category._id
    return function(input, category) {
        if (!category) return input;
        if (!category.length) return input;
        category = category[0];
        var prodinCat= input.filter(function(product) {
            if (product.category === category._id){
                return product;
            }

        });
        return prodinCat;
    }
})

