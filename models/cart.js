const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(prodId, productPrice) {
    //Fetch the previous cart
    fs.readFile(p, (error, filContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(filContent);
      }
      //analyzing the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id.trim()===prodId.trim()
      );
      console.log(existingProductIndex);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = +updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: prodId, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
    //add new product/increase quantity
  }

  //{"products":[{"id":"yEatTzH ","qty":2}],"totalPrice":60}

  static deleteProduct(prodId, productPrice) {
    fs.readFile(p, (error, fileContent) => {
      if(error) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updateCart = {...cart};
      const product = updateCart.products.find(prod => prod.id.trim() === prodId.trim());
      if(!product) {
        return;
      }
      const productQty = product.qty;
      updateCart.products = updateCart.products.filter((prod) => prod.id.trim() !== prodId.trim());
      updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updateCart), (error) => {
        console.log(error);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (error, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(error) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }

};
