const express = require("express");
const router = express.Router({ mergeParams: true });
const cloudinary = require("../config/cloudinaryCon.js");
const {
  adminCreateProfile,
  updateProfile,
  addEducations,
  deleteEducation,
  updateEducation,
  addSkill,
  addTools,
  addProject,
  addCertificate,
  resume,
} = require("../controllers/adminContoller.js");

const {
  uplodeCertificate,
  uplodeProfile,
  uplodeTools,
  uplodeProject,
  uplodeResume,
} = require("../middlewares/uplodeCoudinary.js");

const verifyAdmin = require("../middlewares/verifyToken.js");

router.post(
  "/profile",
  verifyAdmin,
  uplodeProfile.single("image"),
  adminCreateProfile
);

router.put(
  "/profile/:id",
  verifyAdmin,
  uplodeProfile.single("image"),
  updateProfile
);

router.post("/education", verifyAdmin, addEducations);
router.delete("/education/:id", verifyAdmin, deleteEducation);
router.put("/education/:id", verifyAdmin, updateEducation);

router.post("/skills", verifyAdmin, addSkill);

router.post("/tools", verifyAdmin, uplodeTools.single("tool_image"), addTools);

router.post(
  "/project",
  verifyAdmin,
  uplodeProject.single("projectImage"),
  addProject
);
router.post(
  "/certificate",
  verifyAdmin,
  uplodeCertificate.single("image"),
  addCertificate
);
router.post("/resume", verifyAdmin, uplodeResume.single("resume"), resume);

module.exports = router;

// const destroyExistingImage = async()=> {
//   await cloudinary.uploader.destroy("portfolio/profile");
// }
