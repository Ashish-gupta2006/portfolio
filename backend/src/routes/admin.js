const express = require("express");
const router = express.Router();
const {adminCreateProfile, addEducations, addSkill, addTools, addProject, addCertificate, resume }= require("../controllers/adminContoller.js");
const uplodeProfile = require("../middlewares/uplodeImage.js");
const uplodeTools = require('../middlewares/uplodeTool.js');
const uplodeProject = require('../middlewares/uplodeProject.js');
const uplodeCertificate = require('../middlewares/uplodeCertificate.js')
const uplodeResume = require('../middlewares/uplodeResume.js');

router.post("/profile", 
    uplodeProfile.single("image"),
     adminCreateProfile
    );

router.post('/education',addEducations);   
router.post('/skills',addSkill);
router.post("/tools", uplodeTools.single("tool_image"), addTools);
router.post("/project", uplodeProject.single("projectImage"), addProject);
router.post('/certificate',uplodeCertificate.single('image'),addCertificate)
router.post('/resume',uplodeResume.single('resume'), resume);
module.exports = router;
