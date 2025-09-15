const {CloudinaryStorage} =  require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryCon.js');
const multer = require('multer')

const resume = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/resume",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});
 const uplodeResume = multer({ storage:resume}); 
 module.exports = uplodeResume;

