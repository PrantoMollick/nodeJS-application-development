//node global moduel and package
const path = require("path");

//3rd party package and framework
const express = require("express");
const bodyParser = require("body-parser");

//local module of our app
const mongoConnect = require("./util/database").mongoConnect;
const User = require('./models/user');

//create express app root instance
const app = express();

//set template engine
app.set("view engine", "ejs");
app.set("views", "views");

//all routes importate here
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }));
//define the directory of public for static css and js files configaration
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findById('62a70c0aa030f458a3cb98b0')
    .then((user) => { 
       req.user = user;
       next();
    })
    .catch(err => console.log(err));
    next();
})

//sub routes register on express app.
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});
