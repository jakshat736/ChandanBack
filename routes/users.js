const express = require('express');
const router = express.Router();
const User = require('./Schemas/userSchema');
const Cart = require('./Schemas/cartSchema');
var upload = require("./multer")
const uuid = require('uuid');
// POST API to insert a user with only mobile number
router.post('/addusers',upload.single(), async (req, res) => {
  const { mobile } = req.body;
  console.log(req.body)

  try {
    let user = await User.findOne({ mobile });

    if (!user) {
      // If user does not exist, create new user
      user = new User({ mobile });
      await user.save();
      console.log(mobile)
      return res.status(200).json({result:true, mobileNumber: mobile, message: 'Login successful' });
    }


    console.log(user.mobile)
    return res.status(200).json({result:'exist',mobileNumber: mobile, message: 'Login successful' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/addusersbymail',upload.single(), async (req, res) => {
  const { email } = req.body;
  console.log(req.body)

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create new user
      user = new User({ email });
      await user.save();
      return res.status(200).json({result:true, mail: email, message: 'Login successful' });
    }


    console.log(user.email)
    return res.status(200).json({result:'exist',mail: email, message: 'Login successful' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({err:err, message:`${err}` });
  }
});


router.post('/Edit_user', async (req, res) => {
  try {
    const { mobile,name,address, pincode,city,district,state } = req.body;
    console.log(req.body)
    await User.updateOne({ mobile: mobile }, { name: name, address: address,pincode:pincode,city:city,district:district,state:state});
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

router.get('/display_all_users', async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users)
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: [] });
  }
});

module.exports = router;
