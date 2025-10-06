const express = require("express");
const router = express.Router({ mergeParams: true });
const cloudinary = require("../config/cloudinaryCon.js");
const {handleLogout} = require("../controllers/authenticateContoller.js")
const {
  adminCreateProfile,
  updateProfile,
  addEducations,
  deleteEducation,
  updateEducation,
  addSkill,
  updateSkill,
  deleteSkill,
  addTools,
  updateTool,
  deleteTool,
  addProject,
  editproject,
  deleteProject,
  addCertificate,
  updateCertificate,
  deleteCertificate,
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
router.delete("/skills/:id", verifyAdmin, deleteSkill);
router.put("/skills/:id", verifyAdmin, updateSkill);

router.post("/tools", verifyAdmin, 
  uplodeTools.single("tool_image"), 
  addTools);
router.delete("/tools/:id", verifyAdmin, deleteTool);
router.put(
  "/tools/:id",
  verifyAdmin,
  uplodeTools.single("tool_image"),
  updateTool
);

router.post(
  "/project",
  verifyAdmin,
  uplodeProject.single("projectImage"),
  addProject
);
router.delete("/project/:proId", verifyAdmin, deleteProject);
router.put(
  "/project/:id",
  verifyAdmin,
  uplodeProject.single("projectImage"),
  editproject
);
router.post(
  "/certificate",
  verifyAdmin,
  uplodeCertificate.single("image"),
  addCertificate
);
router.put(
  "/certificate/:id",
  verifyAdmin,
  uplodeCertificate.single("image"),
  updateCertificate
);
router.delete("/certificate/:id", verifyAdmin, deleteCertificate);

router.post("/resume", verifyAdmin, uplodeResume.single("resume"), resume);

router.get("/logout", verifyAdmin, handleLogout);
module.exports = router;

