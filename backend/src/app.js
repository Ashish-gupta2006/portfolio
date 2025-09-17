require('dotenv').config({path:'../.env'});
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require('./config/mongodbCon.js')
const adminRoute = require('./routes/admin.js');
const cookieParser = require('cookie-parser');
const Admin = require('./models/admin.js');
const bcrypt = require('bcryptjs')
const handleLogin = require("./controllers/loginController.js");
const Token = require('./models/token.js');
// cross-origin resource share

app.use(cors({
  origin: process.env.FRONTEND_URL, // No trailing slash
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(`${process.env.COOKIE_PARSER}`));
connectDB();

app.get("/", (req, res)=>{
  res.send('server is listen ');
});

app.use('/admin',adminRoute);

app.post('/register',async(req, res)=>{
  const{name, email, password}= req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAdmin = new Admin({
    name:name,
    email:email,
    password:hashedPassword,
  });

   const data = await newAdmin.save();
  res.status(200).json({
    message:data
  })

});

app.use("/login", handleLogin);

app.listen(process.env.PORT, () => {
  console.log(`Server is listen on http://localhost:${process.env.PORT}`);
});