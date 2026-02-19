// const Doctor = require("../models/Doctor");

// // Apply as Doctor
// exports.applyDoctor = async (req, res) => {
//   try {
//     const doctor = new Doctor({
//       ...req.body,
//       userId: req.user._id
//     });

//     await doctor.save();

//     res.status(201).json({
//       message: "Doctor application submitted successfully"
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const User = require("../models/User");

// // 🔹 Get All Doctor Applications (Admin Only)
// exports.getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find().populate("userId", "name email");
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🔹 Approve or Reject Doctor
// exports.updateDoctorStatus = async (req, res) => {
//   try {
//     const { doctorId, status } = req.body;

//     const doctor = await Doctor.findByIdAndUpdate(
//       doctorId,
//       { status },
//       { new: true }
//     );

//     // If approved → update user role to doctor
//     if (status === "approved") {
//       await User.findByIdAndUpdate(doctor.userId, {
//         role: "doctor"
//       });
//     }

//     res.json({
//       message: `Doctor ${status} successfully`
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const Doctor = require("../models/Doctor");
const User = require("../models/User");


// ============================================
// 🔹 Apply as Doctor (User)
// ============================================
exports.applyDoctor = async (req, res) => {
  try {
    const doctor = new Doctor({
      ...req.body,
      userId: req.user._id
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor application submitted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================================
// 🔹 Get All Doctor Applications (Admin Only)
// ============================================
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name email role");

    res.json(doctors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================================
// 🔹 Approve or Reject Doctor (Admin Only)
// ============================================
exports.updateDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    // Update doctor status
    doctor.status = status;
    await doctor.save();

    // If approved → update user role
    if (status === "approved") {
      await User.findByIdAndUpdate(
        doctor.userId,
        { role: "doctor" },
        { new: true }
      );
    }

    res.json({
      message: `Doctor ${status} successfully`
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Get Approved Doctors (For Users)
exports.getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" })
      .populate("userId", "name email");

    res.json(doctors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
