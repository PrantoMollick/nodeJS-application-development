const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found!', layout: false});
})

app.listen(3000);


