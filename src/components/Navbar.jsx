import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-around">
      <Link to="/">Home</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;
