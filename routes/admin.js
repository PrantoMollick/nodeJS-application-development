const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');


// /admin/add-product => Get request
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => Post request
router.post('/add-product', productsController.postAddProduct);

module.exports = router;