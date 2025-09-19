const express = require("express");
const router = express.Router();
const {
  adminCreateProfile,
  addEducations,
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

router.post("/education", verifyAdmin, addEducations);

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
router.post("/resume", 
    verifyAdmin,
     uplodeResume.single("resume"),
      resume);

module.exports = router;
