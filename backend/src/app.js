require('dotenv').config({path:'../.env'});
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require('./config/mongodbCon.js')
// cross-origin resource share

app.use(cors({
  origin: process.env.FRONTEND_URL, // No trailing slash
  credentials: true,
}));
connectDB();

app.get("/", (req, res)=>{
  res.send('server is listen ');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listen on http://localhost:${process.env.PORT}`);
});