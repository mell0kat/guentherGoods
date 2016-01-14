app.filter('filterByCategory', function() {
    return function(input, category) {
        console.log(category, "category in filter")
        if (!category) return input;

        var prodinCat= input.filter(function(product) {
            if (product.category.join("") === category){
                return product;
            }

        });
        return prodinCat;
    }
})

