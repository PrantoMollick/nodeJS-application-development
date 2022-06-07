const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
  
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products, 
      pageTitle: 'shop', 
      path: '/'
    })
  })
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart', 
    pageTitle: 'Your cart'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout', 
    pageTitle: 'Checkout'
  })
}