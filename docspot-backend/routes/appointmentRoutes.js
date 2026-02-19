// const express = require("express");
// const router = express.Router();
// const { bookAppointment } = require("../controllers/appointmentController");
// const { protect } = require("../middleware/authMiddleware");

// // Book appointment (Logged-in users only)
// router.post("/book", protect, bookAppointment);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

const { protect, authorize } = require("../middleware/authMiddleware");

// User books appointment
router.post("/book", protect, bookAppointment);

// Doctor views their appointments
router.get("/doctor-appointments", protect, authorize("doctor"), getDoctorAppointments);

// Doctor approves/rejects appointment
router.post(
  "/update-status",
  protect,
  authorize("doctor"),
  updateAppointmentStatus
);

module.exports = router;
