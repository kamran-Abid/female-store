const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        trim: true,
        require: true
    },
    catId: Number,
    price: Number,
    desc: String,
    size: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
  });
  
  // create new collection 
  const Product = mongoose.model('product', productSchema);

  
  // console.log(showCatagory);

module.exports = Product;

  