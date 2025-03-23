var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    mobile: Number,
    dob: Date,
    otp:Number,
    otpExpiry:Number,
    active: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = {
  UserModel: mongoose.model("UserModel", UserSchema),
};
