const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  skillName: {
    type: String,
    required: true,
  },
  level:{
    type:Number,
    required:true,
  }
});

const Skill = mongoose.model("Skills", skillSchema);
module.exports = Skill;