const Appointment = require("../models/Appointment");

// 🔹 Book Appointment (User)
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const appointment = new Appointment({
      userId: req.user._id,
      doctorId,
      date,
      time
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Doctor views their appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("doctorId");

    // Only return appointments belonging to this doctor
    const doctorAppointments = appointments.filter(
      (appt) => appt.doctorId.userId.toString() === req.user._id.toString()
    );

    res.json(doctorAppointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Doctor updates appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    await Appointment.findByIdAndUpdate(appointmentId, { status });

    res.json({
      message: `Appointment ${status} successfully`
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
