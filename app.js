const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes);
app.use(adminRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page Not found </h1>');
})



app.listen(3000);


