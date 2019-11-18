const express = require('express');

const router = express.Router();

const productController = require("../controllers/product");

router.get('/listing-left-column.html', productController.getLeftListProducts);

module.exports = router;