var express = require('express');
var router = express.Router();
const pool = require('./pool');
const Category = require('./Schemas/categorySchema'); // Import the Category model
const Subcategory = require('./Schemas/subCategorySchema');
const banner = require("./Schemas/bannerSchema")
const Product = require("./Schemas/productSchema")



  router.get('/display_all_category', async (req, res) => {
    try {
      const categories = await Category.find({});
      console.log(categories)
      return res.status(200).json({ data: categories });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: [] });
    }
  });

  

  router.post("/display_all_subcategory", async (req, res) => {
    try {
      const { categoryid } = req.body;
      const subcategories = await Subcategory.find({ categoryid });
      res.status(200).json({ data: subcategories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Data: [] });
    }
  });


  router.get('/display_all_banner', async (req, res) => {
    try {
      const banners = await banner.find({});
      console.log(banners)
      return res.status(200).json({ data: banners });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ data: [] });
    }
  });

  router.post('/display_product_salestatus', function(req, res, next) {
    console.log(req.body);
  
    Product.find({ salestatus: req.body.salestatus })
      .populate('categoryid', 'categoryname')
      .populate('subcategoryid', 'subcategoryname')
      .exec()
      .then(function(products) {
        console.log(products)
        return res.status(200).json({ data: products });
      })
      .catch(function(error) {
        console.log(error);
        return res.status(500).json({ Data: [] });
      });
  });
  
router.post('/search', async (req, res) => {
  try {
    const { keywords } = req.body;
    const products = await Product.find({
      $or: [
        { productname: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
        { description1: { $regex: keywords, $options: 'i' } },
        { description2: { $regex: keywords, $options: 'i' } },
        { description3: { $regex: keywords, $options: 'i' } },
        { description4: { $regex: keywords, $options: 'i' } }
      ]
    });
    return res.status(200).json({ data: products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
  


  router.post('/display_subcategory_banner', function(req, res, next) {
    console.log(req.body);
  
    Subcategory.find({ bannerpriority: req.body.bannerpriority })
      .exec()
      .then(function(subcategories) {
        console.log(subcategories)
        return res.status(200).json({ data: subcategories });
      })
      .catch(function(error) {
        console.log(error);
        return res.status(500).json({ Data: [] });
      });
  });

  
  router.post("/fetch_product_by_subcategory", async (req, res) => {
    try {
      const { subcategoryid } = req.body;
      const subcategories = await Product.find({ subcategoryid:subcategoryid });
      console.log(subcategories)
      res.status(200).json({ data: subcategories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Data: [] });
    }
  });
 
  router.post("/fetch_product_by_category", async (req, res) => {
    try {
      const { categoryid } = req.body;
      const categories = await Product.find({categoryid:categoryid });
      console.log(categories)
      res.status(200).json({ data: categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Data: [] });
    }
  });
 
module.exports = router;
