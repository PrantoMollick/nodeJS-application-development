const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Products {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {}

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('select * from products');
  }

  static findByOne(pId) {}
};
