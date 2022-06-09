const fs = require('fs');
const path = require('path');

const randomstring = require('randomstring');

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if (error) {
      return cb([]);
    } else {
      return cb(JSON.parse(fileContent));
    }
  });
}


module.exports = class Products {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl; 
    this.price = price;
    this.description = description; 
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id.trim());
        const updateProduct = [...products];
        updateProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProduct), (error) => {
          console.log(error);
        });
      } else {
        this.id = randomstring.generate(7);
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    })
  }

  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find(product => product.id.trim() === id.trim());
      const updateProducts = products.filter(product => product.id.trim() !== id.trim());
      fs.writeFile(p, JSON.stringify(updateProducts), (error) => {
        if (!error) {
          Cart.deleteProduct(id, product.price);
        }
      });
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static findByOne(pId, cb) {
    getProductFromFile((products) => {
      const prod = products.find(product => product.id.trim() === pId.trim());
      cb(prod);
    })
  }
};
