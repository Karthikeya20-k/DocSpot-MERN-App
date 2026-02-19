// =======================================
// 📌 IMPORT REQUIRED MODULES
// =======================================

// Import Express
const express = require("express");

// Create router instance
const router = express.Router();

// Import authentication controller functions
const {
  registerUser,
  loginUser
} = require("../controllers/authController");


// =======================================
// 📌 AUTH ROUTES
// Base URL: /api/auth
// =======================================

// 🔹 Register New User
// POST /api/auth/register
// Public route (No authentication required)
router.post("/register", registerUser);


// 🔹 Login Existing User
// POST /api/auth/login
// Public route (No authentication required)
router.post("/login", loginUser);


// =======================================
// 📌 EXPORT ROUTER
// =======================================

module.exports = router;
