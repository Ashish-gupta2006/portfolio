const {CloudinaryStorage} =  require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryCon.js');
const multer = require('multer')

const certification = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/certificate",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});
 const uplodeCertificate = multer({ storage: certification }); 
 module.exports = uplodeCertificate;

