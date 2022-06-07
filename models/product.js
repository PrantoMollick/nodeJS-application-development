const fs = require('fs');
const path = require('path');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl; 
    this.description = description; 
    this.price = price;
  }

  save() {
    this.id = Math.random().toLocaleString();
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log(error);
      });
    })
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static findByOne(pId, cb) {
    getProductFromFile((products) => {
      const prodId = `${pId.trim()}`
      const prod = products.find(product => product.id === prodId);
      cb(prod);
    })
  }
};
