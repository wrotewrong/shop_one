const express = require('express');
const path = require('path');
const productsRoutes = require('./routes/products.routes');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
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

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database');
});

db.on('error', (err) => {
  console.log('Error:' + err);
});
