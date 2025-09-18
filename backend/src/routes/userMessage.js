const express = require('express');
const router = express.Router();
const userMessageController = require('../controllers/userMessageController.js')
router.post("/message", userMessageController);

module.exports = router;