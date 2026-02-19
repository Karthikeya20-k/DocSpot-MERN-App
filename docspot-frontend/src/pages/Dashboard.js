import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return (
      <Layout>
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
        {/* Welcome Card */}
        <div
          style={{
            // background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            margin: "0 auto 40px auto",
            textAlign: "center"
          }}
        >
          {/* <h2>Welcome Back, {user.name} 👋</h2> */}
          <h2 className="animated-text">
            Welcome Back, {user.name} 👋
            </h2>

          <p style={{ marginTop: "10px", color: "#555" }}>
            You are logged in as <strong>{user.role.toUpperCase()}</strong>
          </p>
        </div>

        {/* Role Based Action Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          {user.role === "user" && (
            <div className="action-card">
              <h3>📅 Book Appointment</h3>
              <p>Schedule your visit with approved doctors.</p>
              <button onClick={() => navigate("/book")}>
                Book Now
              </button>
            </div>
          )}

          {user.role === "doctor" && (
            <div className="action-card">
              <h3>🩺 Manage Appointments</h3>
              <p>Approve or reject patient bookings.</p>
              <button onClick={() => navigate("/doctor")}>
                View Appointments
              </button>
            </div>
          )}

          {user.role === "admin" && (
            <div className="action-card">
              <h3>👨‍💼 Approve Doctors</h3>
              <p>Manage doctor applications.</p>
              <button onClick={() => navigate("/admin")}>
                Go to Admin Panel
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
