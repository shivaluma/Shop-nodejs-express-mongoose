const Products = require("../models/product")

exports.getIndexProducts = (req, res, next) => {
    Products.find()
    .then(products => {
        res.render("index", {
            title: "Trang chủ",
            trendings: products,
            topsale: products
        })
    })
    .catch(err => {
        console.log(err);
    })
}

