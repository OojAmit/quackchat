const express = require('express');
const passportSetup = require('./config/passport')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
const socket = require('socket.io');
const Message = require('./models/message');
const Device = require('./models/device');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const User = require('./models/user')

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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quackquack-quackchat.firebaseio.com"
});

io.on('connection', socket => {
  socket.on('message', data => {
    socket.broadcast.emit('message', data);

    User.findById(data.sender, (err, sender) => {
      Device.find({}, (err, devices) => {
        let tokens = devices.map(device => device.token);
        for(token of tokens){
          admin.messaging().send({
            webpush: {
              notification: {
                title: sender.username,
                body: data.msg,
                icon: '/favicon.ico'
              }
            },
            token: token
          }).then(() => {}).catch(err => console.error(err));
        }
      })
    });

    new Message(data).save();
  });
  socket.on('new-device', token => {
    console.log('New Device');
    new Device({
      token: token
    }).save();
  })
  socket.on('update-device', tokens => {
    Device.findOneAndUpdate({token: tokens.old}, {token: tokens.new}, (err, device) => {
      console.log('Device updated');
    });
  })
})
