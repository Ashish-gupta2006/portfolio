const express = require('express');
const router = express.Router();
const {handleLogin  }= require('../controllers/authenticateContoller.js');


router.post('/',handleLogin);
module.exports = router;