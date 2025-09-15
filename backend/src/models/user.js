
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  image: {
    url:{
      type:String,
      required:true
    },
    fileName:{
      type:String,
      required:true
    }
  },
  about:{
    type:String,
    required:true,
  }
},
{timestamps:true});


module.exports = mongoose.model("User", userSchema);
