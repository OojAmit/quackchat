const Router = require('express').Router();


Router.get('/login', (req, res) => {
  res.render('login')
})

Router.get('/google', (req, res) => res.send('Google huh?'))
Router.get('/google/redirect', (req, res) => res.send('Google Redirection'))

Router.get('/logout', (req, res) => res.send('Loggin you out'))


module.exports = Router;
