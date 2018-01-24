const Router = require('express').Router();

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login')
  } else{
    next()
  }
}


Router.get('/', authCheck, (req, res) => {
  res.render('room', {user: req.user})
})


module.exports = Router;
