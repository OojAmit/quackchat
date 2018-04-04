const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  token: String
});

const Device = mongoose.model('device', deviceSchema)


module.exports = Device;
