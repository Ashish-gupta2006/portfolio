const express = require('express');
const router = express.Router();
const {userMessageController,setEducation} = require('../controllers/userMessageController.js')

router.post("/message", userMessageController);
module.exports = router;