const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const products = require('./products.json');

app.use(express.json());

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    if (newProduct.categories) {
      newProduct.categories = newProduct.categories.split(',').map((category) => category.trim());
    } else {
      newProduct.categories = [];
    }
    products.push(newProduct);
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
    res.json(newProduct);
  });
  
  app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      if (updatedProduct.categories) {
        updatedProduct.categories = updatedProduct.categories.split(',').map((category) => category.trim());
      } else {
        updatedProduct.categories = products[index].categories;
      }
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
      res.json(products[index]);
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  });
  
  

  app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      products.splice(index, 1);
      fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
      res.json({ message: 'Товар удален' });
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  });
  

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

app.listen(port, () => {
  console.log(`Admin server started on port ${port}`);
});
