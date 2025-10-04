const express = require('express');
const router = express.Router({mergeParams: true });
const {
  getEducation,
  getSkill,
  getTolls,
  getCertificate,
  getProject,
  getUserInfo,
  getResume
} = require("../controllers/portfolioDataController.js");


router.get("/education", getEducation);
router.get('/skill',getSkill);
router.get("/tool", getTolls);
router.get("/certificate", getCertificate);
router.get('/project', getProject);
router.get("/user", getUserInfo);
router.get('/resume',getResume);

module.exports = router;