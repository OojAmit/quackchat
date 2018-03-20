const Router = require('express').Router();
const User = require('../models/user');

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


module.exports = Router;
