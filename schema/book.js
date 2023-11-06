var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  name: String,
  author: String,
  price: Number,
  publishedDate: Date,
  active: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
},{timestamps:true});

module.exports = {
  "BookModel": mongoose.model('BookModel', bookSchema)
}