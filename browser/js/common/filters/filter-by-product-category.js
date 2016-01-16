app.filter('filterByCategory', function() {
    //input needs to be category._id
    return function(input, category) {
        if (!category.length) return input;
        category = category[0];
        console.log(category, "cat in filter")
        console.log(category._id, "cat in filter")
        console.log(category.name, "cat in filter")
        var prodinCat= input.filter(function(product) {
            console.log(product.category, category._id, category.name, "!")
            if (product.category === category._id){
                return product;
            }

        });
        return prodinCat;
    }
})

