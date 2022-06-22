//node global moduel and package
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//database
const mongoose = require('mongoose');
require('dotenv').config();
const databaseURI = process.env.DATABASE_URI;

const User = require('./models/user');

const app = express();

const store = MongoDBStore({
  uri: databaseURI,
  collection: 'sessions',
})

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require('./routes/auth');
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if(!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then((user) => { 
    req.user = user;
      next();
  })
  .catch(err => console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);




mongoose
  .connect(databaseURI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Pranto",
          email: "pranto@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
  })
  .catch((err) => console.log(err));

app.listen(3000);