const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
   },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cart:{
    type: Object,
    required: true,
  },

  totalAmount:{
    type: String,
    required: true,
  },
  paymentId:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'Not Delivered'
  }

});

module.exports = mongoose.model('Booking', bookingSchema);
