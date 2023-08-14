const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  mobile: {
    type: String,
    unique: true, },
  products:[{
    productId: String,
    count: Number
  }]
 
});

module.exports = mongoose.model('Cart', cartSchema);
