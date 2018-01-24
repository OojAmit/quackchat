const express = require('express');
const passportSetup = require('./config/passport')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');

const port = process.env.PORT || 10004;

var app = express();

app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodb.dbURI, () => console.log('Connected to MongoDB'))

app.use('/auth', require('./routes/auth'))
app.use(require('./routes/room'))

var server = app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})
