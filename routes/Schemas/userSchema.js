const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    unique: true,
    minlength: 10,
    maxlength: 12
  },
email:{
type:String,
unique:true,
},
  name: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  pincode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },

});

module.exports = mongoose.model('User', userSchema);
