// ==============================
// 📌 IMPORT REQUIRED MODULES
// ==============================
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// ==============================
// 📌 LOAD ENV VARIABLES
// ==============================
dotenv.config();

// ==============================
// 📌 CONNECT TO DATABASE
// ==============================
connectDB();

// ==============================
// 📌 INITIALIZE EXPRESS APP
// ==============================
const app = express();

// ==============================
// 📌 MIDDLEWARES
// ==============================

// Enable CORS (allows frontend to connect)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// ==============================
// 📌 ROUTES
// ==============================

// Auth Routes (Register/Login)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Import authentication & authorization middleware
const { protect, authorize } = require("./middleware/authMiddleware");

// ------------------------------
// 🔐 Protected Profile Route
// Only logged-in users can access
// ------------------------------
app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

// ------------------------------
// 👑 Admin Only Route
// Only users with role "admin" can access
// ------------------------------
app.get(
  "/api/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// ------------------------------
// 🏠 Basic Test Route
// ------------------------------
app.get("/", (req, res) => {
  res.send("🚀 DocSpot API Running...");
});

// ==============================
// 📌 START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});


const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctor", doctorRoutes);


const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/appointment", appointmentRoutes);
