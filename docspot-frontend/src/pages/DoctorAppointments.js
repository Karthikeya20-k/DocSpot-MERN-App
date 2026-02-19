import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔹 Fetch Appointments
  const fetchAppointments = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointment/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAppointments(res.data);
    } catch (error) {
      console.log("Error fetching appointments");
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchAppointments();
  }, [fetchAppointments, token, navigate]);

  // 🔹 Update Status
  const updateStatus = async (appointmentId, status) => {
    try {
      await axios.post(
        "http://localhost:5000/api/appointment/update-status",
        { appointmentId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchAppointments();
    } catch (error) {
      alert("Update failed");
    }
  };

  // 🔹 Stats
  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "pending").length;
  const approved = appointments.filter(a => a.status === "approved").length;
  const rejected = appointments.filter(a => a.status === "rejected").length;

  return (
    <Layout>
      <div className="dashboard">
        <h2>Doctor Dashboard 🩺</h2>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total</h3>
            <p>{total}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{pending}</p>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <p>{approved}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p>{rejected}</p>
          </div>
        </div>

        {/* Appointment Table */}
        <div className="table-container">
          {appointments.length === 0 ? (
            <p>No Appointments</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.userId?.name}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td className={`status ${appt.status}`}>
                      {appt.status}
                    </td>
                    <td>
                      {appt.status === "pending" && (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() => updateStatus(appt._id, "approved")}
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() => updateStatus(appt._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DoctorAppointments;
