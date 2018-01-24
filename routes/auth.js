const Router = require('express').Router();
const passport = require('passport');

Router.get('/login', (req, res) => {
  res.render('login')
})

Router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
Router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/'))

Router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/auth/login')
})


module.exports = Router;
