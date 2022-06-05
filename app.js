const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app = express();

const handlebars = exphbs.create({extname: '.hbs', layoutsDir: 'views'});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData.routes);
app.use(shopRoutes);


app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found!', layout: false});
})

app.listen(3000);


