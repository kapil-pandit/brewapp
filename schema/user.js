var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  place: String,
  department: String,
  mobile: Number,
  dob: Date,
  active: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
},{timestamps:true});

module.exports = {
  "UserModel": mongoose.model('UserModel', UserSchema)
}