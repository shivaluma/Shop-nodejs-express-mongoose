var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const productController = require('../controllers/product');
/* GET home page. */

router.get('/', productController.getIndexProducts);

router.get('/product/:productId', productController.getProduct);

router.get('/products/:productType?/:productChild?', productController.getProducts);

router.post('/products', productController.postNumItems);

router.post('/product/:productId', productController.postComment);

router.get('/search', productController.getSearch);

router.get('/shopping_cart', productController.getCart);

router.get('/add-to-cart/:productId', productController.addToCart);

router.get('/modify-cart', productController.modifyCart);

module.exports = router;
