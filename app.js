//node global moduel and package
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//     User.findById('62a70c0aa030f458a3cb98b0')
//     .then((user) => { 
//        req.user = new User(user.name, user.email, user.cart, user._id);
//        next();
//     })
//     .catch(err => console.log(err));
// })

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


mongoose
  .connect(
    "mongodb+srv://kFOgd8E5Pywzpk4K:qDgaIjFirHfHBPdy@cluster0.dc21ept.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .catch((err) => console.log(err));

app.listen(3000);