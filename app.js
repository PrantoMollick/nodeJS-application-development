//node global moduel and package
const path = require("path");

//3rd party package and framework
const express = require("express");
const bodyParser = require("body-parser");

//local module of our app
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item')
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
    User.findByPk(1)
    .then((user) => { 
       req.user = user;
       next();
    })
    .catch(err => console.log(err));
})

//sub routes register on express app.
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

//user created this product and this cascade means the user delete this product will be delete also
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
//this is option to make it crlear one user has many product access
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });


sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log(error);
  });

