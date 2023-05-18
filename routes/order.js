const express = require('express');
var upload = require("./multer")
const Booking = require("./Schemas/orderSchema")
const banner = require("./Schemas/bannerSchema")
const Subcategory = require('./Schemas/subCategorySchema');
const router = express.Router();

router.post('/bookedOrders', async (req, res) => {
    try {
      // Extract data from the request body
      const { mobile, name, address, cart, totalAmount, paymentId } = req.body;
  
      // Create a new booking document
      const newBooking = new Booking({
        mobile,
        name,
        address,
        cart,
        totalAmount,
        paymentId,
      });
  
      // Save the new booking document to the database
      await newBooking.save();
  
      // Return a success response with the new booking document
     return res.status(200).json({data:newBooking,status:true});
    } catch (err) {
      // Handle errors
      console.error(err);
     return res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/display_all_order', async (req, res) => {
    try {
      const bookings = await Booking.find({});
      console.log(bookings)
      return res.status(200).json({ data: bookings });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: [] });
    }
  });

module.exports = router;