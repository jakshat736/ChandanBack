const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true
  },
priority: {
type:String,
required:true,
},
  icon: {
    type: String,
    required: true
  },
 
});

module.exports = mongoose.model('Category', categorySchema);
