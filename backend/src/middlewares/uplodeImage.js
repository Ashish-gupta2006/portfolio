const {CloudinaryStorage} =  require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryCon.js');
const multer = require('multer')

const profile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/profile",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});
 const uplodeProfile = multer({ storage:profile}); 
 module.exports = uplodeProfile;

