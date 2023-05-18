const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  categoryid: {
    type: String,
    required: true,
  },
  subcategoryid: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerprice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  description3: {
    type: String,
    required: true,
  },
  description4: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  salestatus: {
    type: String,
    required: true,
  },
  picture: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
