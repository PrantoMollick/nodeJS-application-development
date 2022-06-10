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

  save() {
    return db.execute(
      'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('select * from products');
  }

  static findByOne(id) {
    return db.execute('SELECT * FROM products WHERE products.id = (?)', [id]);
  }
};
