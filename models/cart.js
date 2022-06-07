const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cat.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    console.log(productPrice);
    //Fetch the previous cart
    fs.readFile(p, (error, filContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(filContent);
      }
      //analyzing the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProduct] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
    //add new product/increase quantity
  }
};
