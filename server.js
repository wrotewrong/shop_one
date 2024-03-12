const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));

app.listen(8000, () => {
  console.log('server is running...');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
