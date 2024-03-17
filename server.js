const express = require('express');
const path = require('path');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(productsRoutes);

app.listen(8001, () => {
  console.log('server is running...');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
