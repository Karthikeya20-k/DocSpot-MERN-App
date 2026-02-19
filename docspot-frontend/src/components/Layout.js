import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      setDarkMode(true);
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-layout">
      <div className="navbar">
        <h3>DocSpot 🏥</h3>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={toggleDarkMode}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
