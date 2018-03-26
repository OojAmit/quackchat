const Router = require('express').Router();
const User = require('../models/user');
const Message = require('../models/message');

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login')
  } else{
    next()
  }
}


Router.get('/', authCheck, (req, res) => {
  User.find({}, (err, users) => {
    res.render('room', {user: req.user, members: users})
  })
})

Router.get('/messages', authCheck, (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})


module.exports = Router;
