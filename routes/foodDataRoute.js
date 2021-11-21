const express = require('express');
const FoodData = require('../schemas/foodDataSchema');
const Category = require('../schemas/categorySchema');
const upload = require('../middlewares/fileUpload');


const router = express.Router();



router.post('/', upload.array('image',3), async (req, res) => {
   const fileNames=await req.files.map(file=>file.filename);
   const foodData = new FoodData({...req.body,images:fileNames});
   try{
         const newfoodData = await foodData.save();
         res.status(200).json({result: newfoodData,message:'succss'});
   }
   catch (err) {
        res.status(500).json({error:'Something Went wrong'});
   }
});

router.get('/', async (req, res) => {
  
   try{
         const foodData = await FoodData.find();
         res.status(200).json({result: foodData, message:'succss'});
   }
   catch (err) {
        res.status(500).json({error:'Something Went wrong'});
   }
   
});

router.get('/all', async (req, res) => {
  
      try{
            const foodData = await FoodData.find();
            const categories = await Category.find();
            res.status(200).json({result: {foods:foodData,categories}, message:'succss'});
      }
      catch (err) {
           res.status(500).json({error:'Something Went wrong'});
      }
      
   });

router.post('/categories', async (req, res) => {
   try{
         const category = await Category.insertMany(req.body);
         res.status(200).json({result: category,message:'succss'});
   }
   catch (err) {
        res.status(500).json({error:'Something Went wrong'});
   }
});



router.get('/categories', async (req, res) => {
  
   try{
         const categories = await Category.find();
         res.status(200).json({result: categories, message:'succss'});
   }
   catch (err) {
        res.status(500).json({error:'Something Went wrong'});
   }
   
});





module.exports = router;
