import React from "react";
import { Outlet, Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-page p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <nav className="mb-4">
        <Link to="bookings" className="mr-4 px-4 py-2 bg-blue-600 text-white rounded">
          Manage Bookings
        </Link>
        <Link to="drivers" className="px-4 py-2 bg-blue-600 text-white rounded">
          Manage Drivers
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Admin;