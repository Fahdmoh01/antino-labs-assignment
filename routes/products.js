'user strict';
const express = require('express');
const{
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}= require('../controllers/products');

const {protect, authorize} = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect,getProducts)
    .post(protect, authorize('admin'), createProduct);

router
    .route('/:productid')
    .get(protect, getProduct)
    .put(protect, authorize('admin'),updateProduct)
    .delete(protect,authorize('admin'),deleteProduct);

 

module.exports = router;