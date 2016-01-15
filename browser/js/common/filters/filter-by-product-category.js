app.filter('filterByCategory', function() {
    return function(input, category) {
        if (!category) return input;

        var prodinCat= input.filter(function(product) {
            if (product.category.join("") === category){
                return product;
            }

        });
        return prodinCat;
    }
})

