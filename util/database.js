const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoClient = (callback) => { 
  MongoClient.connect(
    "mongodb+srv://r0ufAynCPlzbd6w7:aarh4Cjj1Mm7wOm2@cluster0.dc21ept.mongodb.net/?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("connected");
      callback(client);
    })
    .catch((err) => console.log(err));
}

module.exports = mongoClient;