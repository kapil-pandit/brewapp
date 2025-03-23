var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  name: String,
  title: String,
  price: String,
  quantity: Number,
  owner: String,
  totalPrice: Number,
  description: String,
  active: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
},{timestamps:true});

module.exports = {
  "CartModel": mongoose.model('CartModel', CartSchema)
}