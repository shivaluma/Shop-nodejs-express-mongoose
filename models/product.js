const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: [String],
    type: {
        type: String,
        required: true
    },
    color: [String],
    pattern: [String],
    tags: [String],
    images: [String],
    dateAdded: String,
    status: {
        sale: {
            isSale: Boolean,
            salePercent: Number
        },
        isTrending: Boolean
    },
    ofSellers: {
        type: String,
        required: false
    },
    labels: {
        type: String,
        required: true
    },
    materials: [String]
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
