
const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type:Date,
    required: true,
  },
  end: {
    type:Date,
    required: true,
  },
},
{timestamps:true}
);

module.exports= mongoose.model("Education", educationSchema);