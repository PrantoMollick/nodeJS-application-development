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
  constructor(title) {
    this.title = title;
  }

  save() {
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
};
