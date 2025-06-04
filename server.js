const express = require('express');
const path = require('path');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passportConfig = require('./config/passport');

const app = express();

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({ client: db.getClient() }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(productsRoutes);
app.use(ordersRoutes);
app.use(authRoutes);
app.use(userRoutes);

const server = app.listen(8000, () => {
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

module.exports = server;
