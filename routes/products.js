const express = require('express');
var upload = require("./multer")
const Product = require("./Schemas/productSchema")
const banner = require("./Schemas/bannerSchema")
const Subcategory = require('./Schemas/subCategorySchema');
const router = express.Router();

/* GET home page. */
router.post('/addrecord_data', upload.any(), async (req, res) => {
  try {
    
    const { categoryid, subcategoryid ,productname, price,offerprice,stock,description,description1,description2,description3,description4,rating,status,salestatus } = req.body;
    console.log(req.body)
    console.log(req.files)
    const pictures = req.files.map(file => file.originalname);
    console.log(pictures)
    const product = new Product({ productname,offerprice,stock,rating,status,salestatus, description,description1,description2,description3,description4, price, categoryid, subcategoryid,picture: pictures });
    await product.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

router.post('/getproductbyid', upload.single(''),async (req, res) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    console.log(product)
    if (product) {
     return res.status(200).json({ success: true, product });
    } else {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get('/display_all_products', async function(req, res, next) {
  try {
    const products = await Product.find()
      .populate('categoryid', 'categoryname')
      .populate('subcategoryid', 'subcategoryname');
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: [] });
  }
});


router.post('/Edit_product_data', async (req, res) => {
  try {
    const { productid,categoryid,subcategoryid, productname,price,offerprice,stock,description,description1,description2,description3,description4,rating,status,salestatus } = req.body;
    console.log(req.body)
    await Product.updateOne({ _id: productid }, { categoryid: categoryid, subcategoryid: subcategoryid,productname:productname,price:price,offerprice:offerprice,stock:stock,description:description,description1:description1,description2:description2,description3:description3,description4:description4,rating:rating,status:status,salestatus:salestatus });
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
});




router.post('/delete_product_data',upload.single(''), async (req, res) => {
  try {
    const { productid } = req.body;
    console.log(productid)
    await Product.deleteOne({ _id: productid });
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false });
  }
});

router.post('/update_pictures', upload.any(), async function(req, res, next) {
  try {
    console.log('rr',req.files)
    const pictures = req.files.map(file => file.originalname);
    const product = await Product.findByIdAndUpdate(req.body.productid, {
      picture: pictures,
    });
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
});

router.post("/display_subcategory_by_category", async (req, res) => {
  try {
    const { categoryid } = req.body;
    const subcategories = await Subcategory.find({ categoryid });
    console.log(subcategories)
    res.status(200).json({ data: subcategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Data: [] });
  }
});

// Display products by subcategory ID
router.post("/displayproduct_bysubcategoryid", async (req, res) => {
  try {
    const { subcategoryid } = req.body;
    const products = await Product.find({ subcategoryid })
      .populate("categoryid", "categoryname")
      .populate("subcategoryid", "subcategoryname");
    res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Data: [] });
  }
});

// Add banner pictures
router.post("/add_banner_picture", upload.any(), async (req, res) => {
  try {
    console.log(req.files)
    const bannerpicture = req.files.map((file) => file.originalname);
    const newBanner = new banner({ bannerpicture });
    await newBanner.save();
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false });
  }
});



module.exports = router;
