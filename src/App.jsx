import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import AdminBookings from "./components/AdminBookings";
import AdminDrivers from "./components/AdminDrivers";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([
    { username: "admin", password: "admin123", role: "admin" }
  ]);
  const navigate = useNavigate();

  const handleSignUp = (user) => {
    setUsers([...users, { ...user, role: "user" }]);
  };

  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setUserRole(user.role);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    navigate("/login");
    setUserRole(null);
  };

  return (
    <div className="flex">
      <Navbar userRole={userRole} onLogout={handleLogout} />
      <div className="ml-64 p-6 w-full">
        <Routes>
          <Route path="/" element={userRole ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/home" element={userRole ? <Home /> : <Navigate to="/login" />} />
          {userRole === "user" && <Route path="/bookings" element={<Bookings />} />}
          {userRole === "admin" && (
            <Route path="/admin" element={<Admin />}>
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="drivers" element={<AdminDrivers />} />
            </Route>
          )}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpForm onSignUp={handleSignUp} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;