const Products = require("../models/product")


// demo chu chua xu ly
exports.getIndexProducts = (req, res, next) => {
    Products.find()
    .then(products => {
        res.render("index", {
            title: "Trang chủ",
            trendings: products
        })
    })
    .catch(err => {
        console.log(err);
    })
}


exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Products.find({_id:`${prodId}`})
    .then(product => {
        console.log(product);
        res.render("product", {
            title: `${product[0].name}`,
            prod: product[0]
        })
    })
    .catch(err => {
        console.log(err);
    })
}

