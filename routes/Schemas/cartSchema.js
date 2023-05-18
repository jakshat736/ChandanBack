const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 12
  },
  products:[{
    productId: String,
    count: Number
  }]
 
});

module.exports = mongoose.model('Cart', cartSchema);
