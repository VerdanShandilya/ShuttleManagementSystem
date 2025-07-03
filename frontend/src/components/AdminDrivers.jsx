import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch drivers from the API
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("https://shuttlemanagementsystem.onrender.com/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriver = async () => {
    if (!driverName || !driverPhone) return;
    const newDriver = {
      name: driverName,
      phone: driverPhone,
    };

    try {
      const response = await axios.post("http://localhost:3000/drivers", newDriver);
      setDrivers([...drivers, response.data]);
      setDriverName("");
      setDriverPhone("");
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3000/drivers/${id}`, {
        currentStatus: newStatus,
      });
      const updatedDrivers = drivers.map((driver) =>
        driver._id === id ? response.data : driver
      );
      setDrivers(updatedDrivers);
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  // Filter drivers by name
  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (<>
  <br/>
    <div className="p-6 min-h-screen bg-gray-50 rounded-2xl">
      {/* Top row: Driver Name, Phone Number, + Add New Driver button */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter driver name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter phone number"
          value={driverPhone}
          onChange={(e) => setDriverPhone(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddDriver}
          className="bg-blue-600 text-white font-medium rounded px-4 py-2 hover:bg-blue-700 transition duration-300 rounded-xl"
        >
          + Add New Driver
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search drivers by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Driver list */}
      <ul className="space-y-4">
        {filteredDrivers.map((driver) => (
          <li
            key={driver._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">{driver.name}</p>
              <p className="text-gray-500 text-sm">Phone: {driver.phone}</p>
              <p className="text-gray-500 text-sm">ID: #{driver._id.slice(-5)}</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Status Pill */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                  ${
                    driver.currentStatus === "Available"
                      ? "bg-green-100 text-green-700"
                      : driver.currentStatus === "On Break"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {driver.currentStatus}
              </span>

              {/* Status Dropdown */}
              <select
                value={driver.currentStatus}
                onChange={(e) => handleStatusChange(driver._id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="Available">Start Duty (Available)</option>
                <option value="On Break">On Break</option>
                <option value="Unavailable">End Duty (Unavailable)</option>
              </select>
            </div>
          </li>
        ))}

        {/* Show a message if no drivers match the search */}
        {filteredDrivers.length === 0 && (
          <li className="text-center text-gray-500">No drivers found.</li>
        )}
      </ul>
    </div>
    </>
  );
};

export default AdminDrivers;
