const express = require('express');
const router = express.Router();
const handleRegisteration = require('../controllers/registrationController.js');

router.post("/", handleRegisteration);

module.exports = router;