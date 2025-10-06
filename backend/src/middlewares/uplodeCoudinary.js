const multer = require("multer");
const cloudinary = require("../config/cloudinaryCon.js");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const certification = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/certificate",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});
const profile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/profile",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const project = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/project",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const resume = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/resume",
    allowed_formats: ["png", "jpg", "jpeg", "pdf"],
  },
});


const tool = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio/tools",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const uplodeTools = multer({ storage: tool });
const uplodeResume = multer({ storage: resume });
const uplodeProject = multer({ storage: project });
const uplodeProfile = multer({ storage: profile });
const uplodeCertificate = multer({ storage: certification });

module.exports = {
  uplodeCertificate,
  uplodeTools,
  uplodeResume,
  uplodeProject,
  uplodeProfile,
};
