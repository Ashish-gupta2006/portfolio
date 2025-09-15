const cloudinary = require('../config/cloudinaryCon.js');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

const project = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/project",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const uplodeProject = multer({storage:project});
 module.exports = uplodeProject;