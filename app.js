const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData.routes);
app.use(shopRoutes);


app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);


