const express = require('express');

const port = process.env.PORT || 80;
const ip = '45.44.8.66';

var app = express();

app.get('/', (req, res) => {
  res.send('Ooj is awesome!')
})

var server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})
