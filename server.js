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

const server = app.listen(8001, () => {
  if (NODE_ENV !== 'test') {
    console.log('server is running...');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') {
  dbUri = process.env.DB_URI;
} else if (NODE_ENV === 'test') {
  dbUri = 'mongodb://localhost:27017/shopOne';
} else {
  dbUri = 'mongodb://localhost:27017/shopOne';
}
mongoose.connect(dbUri);

const db = mongoose.connection;

db.once('open', () => {
  if (NODE_ENV !== 'test') {
    console.log('connected to the database');
  }
});

db.on('error', (err) => {
  console.log('Error:' + err);
});

module.exports = server;
