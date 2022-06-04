const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// /admin/add-product => Get request
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {pageTitle: "Add Product"});
  // res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => Post request
router.post('/add-product', (req, res, next) => {
  products.push({title: req.body.title})
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
