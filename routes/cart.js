const express = require('express');
var upload = require("./multer")
const Cart= require('./Schemas/cartSchema'); // Import the Category model
const router = express.Router();
// Add a product to the cart

// Define the POST API endpoint for inserting products into the cart
router.post('/add',upload.single(''), (req, res) => {
  const mobile = req.body.mobile;
  const product = {
    productId: req.body.productId,
    count: req.body.count
  };

  Cart.findOne({ mobile: mobile })
    .then((cart) => {
      if (cart) {
        // Mobile number exists, so add product to the existing cart
        cart.products.push(product);
        return cart.save();
      } else {
        // Mobile number doesn't exist, so create a new cart
        const newCart = new Cart({
          mobile: mobile,
          products: [product]
        });
        return newCart.save();
      }
    })
    .then(() => {
      return res.status(200).json({ result: true});
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ result: false,message: 'Internal server error' });
    });
});
  // Get all products in the cart for a mobile number
router.post('/getAllProducts', upload.single(''),async (req, res) => {
    const { mobile } = req.body;
  
    try {
      const cart = await Cart.findOne({ mobile });
      console.log(cart)
  
      if (!cart) {
        // If cart does not exist for the mobile number, return an error
        return res.status(400).json({ result: false, message: 'Cart not found' });
      } else {
        // If cart exists for the mobile number, return all the products in the cart
        return res.status(200).json({ result: true, products: cart.products });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  // Remove a product from the cart
  router.post('/remove',upload.single(''), async (req, res) => {
    const { mobile, productId } = req.body;
  
    try {
      let cart = await Cart.findOne({ mobile });
  
      if (!cart) {
        // If cart does not exist for the mobile number, return an error
        res.status(400).json({ result: false, message: 'Cart not found' });
      } else {
        // If cart already exists for the mobile number, remove the product from the cart
        const productIndex = cart.products.findIndex(product => product.productId === productId);
        if (productIndex >= 0) {
          // Product found, so remove it from the cart
          cart.products.splice(productIndex, 1);
          await cart.save();
          res.status(200).json({ result: true, message: 'Product removed from cart' });
        } else {
          // Product not found in cart, so return an error
          res.status(400).json({ result: false, message: 'Product not found in cart' });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/cartsdelete', async (req, res) => {
    const { mobile } = req.body;
  
    try {
      // Find the cart by _id and remove it
      const deletedCart = await Cart.findOneAndRemove({ mobile: mobile });
      if (!deletedCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      return res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
  router.post('/update-count', upload.single(''), async (req, res) => {
    const { mobile, productId, count } = req.body;
  
    try {
      let cart = await Cart.findOne({ mobile });
  
      if (!cart) {
        // If cart does not exist for the mobile number, return an error
        res.status(400).json({ result: false, message: 'Cart not found' });
      } else {
        // If cart already exists for the mobile number, find the product in the cart and update its count
        const productIndex = cart.products.findIndex(product => product.productId === productId);
        if (productIndex >= 0) {
          // Product found, so update its count
          cart.products[productIndex].count = count;
          await cart.save();
          res.status(200).json({ result: true, message: 'Product count updated in cart' });
        } else {
          // Product not found in cart, so return an error
          res.status(400).json({ result: false, message: 'Product not found in cart' });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  module.exports = router;
