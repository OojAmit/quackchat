const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  googleID: String,
  thumbnail: String,
  online: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('user', userSchema)


module.exports = User;
