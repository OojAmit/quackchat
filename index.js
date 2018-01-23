const express = require('express');

const port = process.env.PORT || 10004;

var app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('dashboard')
})

app.use('/auth', require('./routes/auth'))

var server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})
