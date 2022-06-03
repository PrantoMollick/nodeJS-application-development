const http = require('http');

const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  res.send("<h1>Here is Add Product page</h1>");
});

app.use('/', (req, res, next) => {
  console.log("Is another middleware");
  res.send('<h1>Hello express</h1>')
}); 

app.listen(3000);


