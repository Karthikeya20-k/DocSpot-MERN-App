import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔹 Fetch Approved Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/doctor/approved",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDoctors(res.data);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      }
    };

    if (!token) {
      navigate("/");
      return;
    }

    fetchDoctors();

  }, [token, navigate]);

  // 🔹 Book Appointment
  const handleBooking = async () => {
    if (!selectedDoctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/appointment/book",
        {
          doctorId: selectedDoctor,
          date,
          time
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Appointment Booked Successfully!");

      setSelectedDoctor("");
      setDate("");
      setTime("");

    } catch (error) {
      alert("Booking Failed");
    }
  };

  return (
    <Layout>
      <div className="dashboard">
        <h2>Book Appointment 📅</h2>

        <div
          style={{
            maxWidth: "400px",
            margin: "40px auto",
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          {/* Doctor Dropdown */}
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            style={{ width: "100%", marginBottom: "15px", padding: "8px" }}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.userId?.name} - {doc.specialization}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", marginBottom: "15px", padding: "8px" }}
          />

          {/* Time Picker */}
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ width: "100%", marginBottom: "20px", padding: "8px" }}
          />

          {/* Book Button */}
          <button
            onClick={handleBooking}
            style={{
              width: "100%",
              padding: "10px",
              background: "#2a5298",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default BookAppointment;
