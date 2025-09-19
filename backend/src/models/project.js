const mongoose = require("mongoose");

const projectSchema = new  mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectImage: {
      url: {
        type: String,
        required: true,
      },
      fileName: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
