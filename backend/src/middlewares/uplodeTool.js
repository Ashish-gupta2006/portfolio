
const {CloudinaryStorage}=  require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require("../config/cloudinaryCon.js");

const tool =  new CloudinaryStorage({
  cloudinary :cloudinary,
  params: {
    folder: "portfolio/tools",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const uplodeTools = multer({storage:tool});
module.exports = uplodeTools;

