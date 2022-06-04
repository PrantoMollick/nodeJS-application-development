const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => Get request
router.get('/add-product', (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => Post request
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
