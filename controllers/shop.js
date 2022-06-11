const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  })
  .catch((error) => {
    console.log(error);
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
  // Product.findAll({where: { id: productId}})
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((error) => console.log(error));

};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'shop',
        path: '/',
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your cart",
        products: products,
        totalPrice: 10,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantitiy = 1;
  req.user
    .getCart()
    .then(cart => {
      
      fetchedCart = cart;
      return cart.getProducts({where: {id: productId}})
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantitiy = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId)
    })
    .then((product) => { 
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantitiy },
      });  
    })
    .then(() => { 
      res.redirect('/cart');
    })
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByOne(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
