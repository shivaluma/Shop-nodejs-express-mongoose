var express = require('express');
var router = express.Router();
const userController = require("../controllers/user")
const productController = require("../controllers/product")
/* GET home page. */


router.get('/', productController.getIndexProducts)

router.get('/product/:productId', productController.getProduct)

module.exports = router;
