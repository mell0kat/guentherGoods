app.filter('filterByCategory', function() {
    return function(input, category) {
        if (!category) return input;
        console.log(input, category)
        var prodinCat= input.filter(function(product) {
            if (product.category.join("") === category){
                console.log(product.category, "CAT")
                return product;
            }

        });
        return prodinCat;

    }
})

