const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user))
})

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id}).then(currentUser => {
      if (currentUser) {
        done(null, currentUser)
      } else {
        new User({
          googleID: profile.id,
          username: profile.name.givenName,
          email: profile.emails[0].value,
          thumbnail: profile.photos[0].value
        }).save().then(newUser => done(null, newUser))
      }
    })
  })
)
