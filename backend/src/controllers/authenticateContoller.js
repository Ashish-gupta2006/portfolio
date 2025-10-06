const Admin = require('../models/admin.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { message } = require('../validations/adminProfile.js');

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email:email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "password is incorrect",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

//  res.cookie("twt", token, {
//    httpOnly: true, 
//    signed: true, 
//    secure: false, 
//    sameSite: "lax", 
//    maxAge: 24 * 60 * 60 * 1000,
//  });

 res.cookie("twt", token, {
   httpOnly: true,
   signed: true,
   secure: true,
   sameSite: "None",
   maxAge: 24 * 60 * 60 * 1000,
 });
 
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

const handleLogout = (req, res) => {
  res.cookie("twt", "", {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully!",
  });
};


module.exports = { handleLogin, handleLogout};