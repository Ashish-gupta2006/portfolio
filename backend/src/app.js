require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/mongodbCon.js");

const adminRoute = require("./routes/admin.js");
const authenticateRoute = require("./routes/authenticate.js");
const registerationRoute = require("./routes/registration.js");
const verifyToken = require("./middlewares/verifyToken.js");
const userMessageRoute = require('./routes/userMessage.js')
// ✅ Correct CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PARSER));

// ✅ Connect DB
connectDB();

// ✅ Verify token route
app.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token verified successfully",
    user: req.user,
  });
});

// Routes
app.use("/admin",adminRoute);
app.use("/register", registerationRoute);
app.use("/login", authenticateRoute);
app.use("/logout", authenticateRoute);
app.use("/user", userMessageRoute);


app.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});
