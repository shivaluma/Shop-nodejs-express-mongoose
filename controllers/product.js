const Products = require("../models/product")


// demo chu chua xu ly
exports.getIndexProducts = (req, res, next) => {
    Products.find()
    .then(products => {
        
        console.log(products);
        res.render("index", {
            title: "Trang chủ",
            trendings: products
        })
    })
    .catch(err => {
        console.log(err);
    })
}

