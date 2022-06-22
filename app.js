//node global moduel and package
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();


const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require('./routes/auth');
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findById('62b22e85584057067113ae71')
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



const databaseURI = process.env.DATABASE_URI;
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