const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const getDb = require('../util/database').getDB;
class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) }).next();
  }
}

module.exports = User;
