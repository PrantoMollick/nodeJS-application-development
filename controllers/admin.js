const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; 
  const imageUrl = req.body.imageUrl;
  const price = req.body.price; 
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === 'true';
  if(!editMode) {
    return res.status(301).redirect('/');
  }

  const prodId = req.params.productId;
  Product.findByOne(prodId, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode, 
      product: product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title; 
  const imageUrl = req.body.imageUrl;
  const price = req.body.price; 
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      pageTitle: 'Admin  Products',
      path: '/admin/products',
    });
  });
};
