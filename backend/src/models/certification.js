const mongoose = require("mongoose");

const certificationeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  institute:{
    type:String,
    requied:true
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      requied: true,
    },
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
}
);

const Certicate = mongoose.model("Certicate", certificationeSchema);
module.exports = Certicate;