import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import AdminBookings from "./components/AdminBookings";
import AdminDrivers from "./components/AdminDrivers";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="drivers" element={<AdminDrivers />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;