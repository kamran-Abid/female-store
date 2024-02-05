const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Pcatagory = require('../models/catagory.js');
const Product =  require('../models/product.js');
const User =  require('../models/user.js');
const { authenticateToken } = require('../middleware/auth');


router.get('/', (req, res) => {
    res.send('Hello World!');
 });

 router.get('/stores', async (req, res) => {
    // Retrieve data from the 'store' collection
    const storeCollection = db.collection('store');
    const stores = await storeCollection.find({},  (err, stores) => {
        if (err) {
          console.error('Error retrieving data:', err);
          return;
        }
    
        // Process and display the retrieved data
        console.log('Retrieved stores:');});
  
    // Send response with the retrieved data
    res.send(stores);
  });

  router.get('/users', (req, res)=>{
    res.json({"users": ["user1", "user2", "user3", "user4", "user5"]});
  })

  // Express Route to Get All Data from 'pcatagory' Collection
router.get('/pcatagory', async (req, res) => {
   try {
     const data = await Pcatagory.find({}).sort({"id":1});
     res.json(data);
   } catch (error) {
     console.log(error);
     res.status(500).send('Internal Server Error');
   }
 });

 // save data in pcatagory db
router.post('/savepcatagory',async(req,res)=>{
   try{
      const record = new Pcatagory(req.body);
      const insertRecord = await record.save();
      res.status(201).send(insertRecord);
   } catch(e){
      console.log("Error in saving data:-\n", e);
      res.send(400).send(e);
   }
})

// get specific data by _id
router.get('/getpcatagory/:id',async(req, res)=>{
   try{
      const _id = req.params.id;
      const specificRecord = await Pcatagory.findById({_id});
      res.send(specificRecord);
   } catch(e){
      console.log("Error in getting specific record");
      res.status(400).send(e);
   }
})

// get specific data by category id
router.get('/pcatagories/:id',async(req, res)=>{
    console.log("This route is called.");
   try{
      const id = req.params.id;
      const specificRecord = await Pcatagory.find({id});
    //   const countSRecord = await Pcatagory.count({id: 1});
      res.send(specificRecord);
    //   console.log(countSRecord);
   } catch(e){
      console.log("Error in getting specific record");
      res.status(400).send(e);
   }
})

// update specific data by _id
router.patch('/pcatagory/:id',async(req, res)=>{
   try{
      const _id = req.params.id;
      const specificRecord = await Pcatagory.findByIdAndUpdate(_id, req.body, {new:true});
      res.send(specificRecord);
   } catch(e){
      console.log("Error in updating specific record");
      res.status(500).send(e);
   }
})

// delete specific data by _id
router.delete('/pcatagory/:id',async(req, res)=>{
   try { 
      const specificRecord = await Pcatagory.findByIdAndDelete(req.params.id);
      res.send(specificRecord);
   } catch(e){
      console.log("Error in updating specific record");
      res.status(500).send(e);
   }
})

// catagory routes end 

// product route start 

// save data in product db
router.post('/productdesc',async(req,res)=>{
   try{
      const record = new Product(req.body);
      const insertRecord = await record.save();
      res.status(201).send(insertRecord);
   } catch(e){
      console.log("Error in saving product:-\n", e);
      res.send(400).send(e);
   }
})

  // Express Route to Get All Data from 'product' Collection
  router.get('/productdesc', async (req, res) => {
   try {
     const data = await Product.find({}).sort({"id":1});
     res.json(data);
   } catch (error) {
     console.log(error);
     res.status(500).send('Internal Server Error in getting products.');
   }
 });

 // get specific data by _id of product
router.get('/getproductdesc/:id',async(req, res)=>{
   try{
      const _id = req.params.id;
      const specificRecord = await Product.findById({_id});
      res.send(specificRecord);
   } catch(e){
      console.log("Error in getting specific product.");
      res.status(400).send(e);
   }
})


// get specific data by product id
router.get('/getproductid/:id',async(req, res)=>{
   console.log("This route is called.");
  try{
     const id = req.params.id;
     const specificRecord = await Product.find({id});
   //   const countSRecord = await Pcatagory.count({id: 1});
     res.send(specificRecord);
   //   console.log(countSRecord);
  } catch(e){
     console.log("Error in getting specific record");
     res.status(400).send(e);
  }
})

// get specific data by category id
router.get('/productbycatid/:id',async(req, res)=>{
  try{
     const catId = req.params.id;
     const specificRecord = await Product.find({catId});
   //   const countSRecord = await Pcatagory.count({id: 1});
     res.send(specificRecord);
   //   console.log(countSRecord);
  } catch(e){
     console.log("Error in getting specific record");
     res.status(400).send(e);
  }
})

// update specific data by _id
router.patch('/productdesc/:id',async(req, res)=>{
   try{
      const _id = req.params.id;
      const specificRecord = await Product.findByIdAndUpdate(_id, req.body, {new:true});
      res.send(specificRecord);
   } catch(e){
      console.log("Error in updating specific record");
      res.status(500).send(e);
   }
})

// delete specific data by _id
router.delete('/productdesc/:id',async(req, res)=>{
   try { 
      const specificRecord = await Product.findByIdAndDelete(req.params.id);
      res.send(specificRecord);
   } catch(e){
      res.status(500).send(e);
   }
})

// product route end 

// User Routes start

var loginId = 0;

// Registration
router.post('/api/register', async (req, res) => {
   try {
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     const user = new User({id: loginId++, username: req.body.username, role: req.body.role, password: hashedPassword, role: req.body.role });
     await user.save();
     res.status(201).send(`User '${req.body.username}' registered successfully`);
   } catch (error) {
     res.status(500).send(error.message);
   }
 });
 
 // Login
 router.post('/api/login', async (req, res) => {
   const user = await User.findOne({ username: req.body.username });
 
   if (!user) {
     return res.status(401).send('Invalid username or password');
   }
 
   const validPassword = await bcrypt.compare(req.body.password, user.password);
 
   if (!validPassword) {
     return res.status(401).send('Invalid username or password');
   }
 
   const token = jwt.sign({ username: user.username }, 'your-secret-key');
   res.json({token, username: req.body.username });
 });
 
 // Protected Route
 router.get('/api/protected', authenticateToken, (req, res) => {
   console.log(req.user);
   res.json(req.user);
 });

 router.get('/api/logout', authenticateToken, (req, res)=>{
   try{
      console.log("Logout...");
      res.send('Logout successfully.');
   } catch(err){
      res.status(500).send(err);
   }
 })
 

// User Routes end

module.exports = router;