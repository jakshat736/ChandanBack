const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  bannerpicture: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Banner', bannerSchema);
