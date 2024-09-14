import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [classes, setClasses] = useState([]);
  const [units, setUnits] = useState([]);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data.classes);
        setRole(response.data.role); // Assuming role is returned from the API
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <span>Username: {localStorage.getItem("username")}</span>
        <span>Role: {role}</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div>
        {role === "admin" && (
          <div>
            <h2>Create Class</h2>
            {/* Form for creating classes */}
            {classes.map((classItem) => (
              <div key={classItem.id}>
                <h3>{classItem.name}</h3>
                {/* List units for this class */}
              </div>
            ))}
          </div>
        )}
        {role !== "admin" && (
          <div>
            <h2>My Classes</h2>
            {classes.map((classItem) => (
              <div key={classItem.id}>
                <h3>{classItem.name}</h3>
                {/* List units for this class */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
