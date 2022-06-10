//node global moduel and package
const path = require('path');

//3rd party package and framework
const express = require('express');
const bodyParser = require('body-parser');

//local module of our app
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

//create express app root instance
const app = express();

//set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//all routes importate here
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }));
//define the directory of public for static css and js files configaration
app.use(express.static(path.join(__dirname, 'public')));

//sub routes register on express app.
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//user created this product and this cascade means the user delete this product will be delete also
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//this is option to make it crlear one user has many product access
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 3000);

