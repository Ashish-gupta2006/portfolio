const mongoose = require('mongoose');

const skillSchema = new  mongoose.Schema({
  skillName: {
    type: String,
    required: true,
  },
  level:{
    type:Number,
    required:true,
  }
});

module.exports = mongoose.model("Skills", skillSchema);
