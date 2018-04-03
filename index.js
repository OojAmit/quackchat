const express = require('express');
const passportSetup = require('./config/passport')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const socket = require('socket.io');
const Message = require('./models/message');

const port = process.env.PORT || 10004;

var app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 7 * 24 * 60 * 60 * 1000,
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

var io = socket(server);

io.on('connection', socket => {
  socket.on('message', data => {
    socket.broadcast.emit('message', data);
    new Message(data).save();
  })
})
