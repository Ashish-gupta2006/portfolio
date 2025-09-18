const bcrypt = require('bcryptjs');
const Admin = require('../models/admin.js');

const handleRegisteration = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAdmin = new Admin({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const data = await newAdmin.save();
  res.status(200).json({
    message: data,
  });
};


module.exports = handleRegisteration;