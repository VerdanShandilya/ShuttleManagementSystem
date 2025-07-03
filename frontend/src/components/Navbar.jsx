import React from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, User, LogIn, LogOut, History } from "lucide-react"; // Import icons

const Navbar = ({ userRole, onLogout }) => {
  return (
    <nav className="h-screen w-72 bg-white shadow-lg text-gray-900 flex flex-col items-start px-6 py-8 fixed border-r border-gray-200">
      {/* Logo / Title */}
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Shuttle System</h1>

      {/* Navigation Links */}
      <div className="w-full flex flex-col space-y-4">
        {userRole && <NavItem to="/home" icon={<Home size={20} />} label="Home" />}
        {userRole === "user" && (
          <>
            <NavItem to="/bookings" icon={<Calendar size={20} />} label="Bookings" />
            <NavItem to="/history" icon={<History size={20} />} label="History" />
          </>
        )}
        {userRole === "admin" && <NavItem to="/admin" icon={<User size={20} />} label="Admin" />}
      </div>

      {/* Extra Space for Separation */}
      <div className="flex-grow"></div>

      {/* Logout Section */}
      <div className="w-full">
        {userRole ? (
          <button onClick={onLogout} className="flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-300">
            <span className="mr-3"><LogOut size={20} /></span>
            Logout
          </button>
        ) : (
          <>
            <NavItem to="/login" icon={<LogIn size={20} />} label="Login" />
            <NavItem to="/signup" icon={<LogIn size={20} />} label="Sign Up" />
          </>
        )}
      </div>
    </nav>
  );
};

// Reusable Nav Item Component
const NavItem = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-300"
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
};

export default Navbar;