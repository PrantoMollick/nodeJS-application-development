const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db;

const mongoConnect = () => {
  MongoClient.connect(
    "mongodb+srv://r0ufAynCPlzbd6w7:aarh4Cjj1Mm7wOm2@cluster0.dc21ept.mongodb.net/node-complete?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      // callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};


const getDB = () => { 
  if(_db) {
    return _db;
  }

  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;