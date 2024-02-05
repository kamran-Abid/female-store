const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        trim: true,
        require: true
    },
    note: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
  });
  
  // create new collection 
  const Pcatagory = mongoose.model('pcatagory', catagorySchema);

  
  // console.log(showCatagory);

module.exports = Pcatagory;

  