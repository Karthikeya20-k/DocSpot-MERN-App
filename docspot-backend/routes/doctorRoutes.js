const express = require("express");
const router = express.Router();

const {
  applyDoctor,
  getAllDoctors,
  updateDoctorStatus,
  getApprovedDoctors
} = require("../controllers/doctorController");

const { protect, authorize } = require("../middleware/authMiddleware");

// 🔹 Apply as doctor (User)
router.post("/apply", protect, applyDoctor);

// 🔹 Get all doctors (Admin only)
router.get("/all", protect, authorize("admin"), getAllDoctors);

// 🔹 Approve / Reject doctor (Admin only)
router.post("/update-status", protect, authorize("admin"), updateDoctorStatus);

// 🔹 Get approved doctors (User booking)
router.get("/approved", protect, getApprovedDoctors);

module.exports = router;
