import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Shuttle Management System</h1>
      <p className="text-lg mb-6">Book your shuttle rides with ease and manage schedules efficiently.</p>
      <Link to="/bookings" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Book a Shuttle
      </Link>
    </div>
  );
};

export default Home;
