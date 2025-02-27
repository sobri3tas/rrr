const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});  

app.get('/api/products', (req, res) => {
  const products = require('./products.json');
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
