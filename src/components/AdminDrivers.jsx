
import React, { useState, useEffect } from "react";
import { mockShuttleData } from "../utils/mockData";

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState(() => {
    const savedDrivers = sessionStorage.getItem("drivers");
    return savedDrivers ? JSON.parse(savedDrivers) : mockShuttleData.drivers;
  });
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    sessionStorage.setItem("drivers", JSON.stringify(drivers));
  }, [drivers]);

  const handleAddDriver = () => {
    if (!driverName || !driverPhone) return;
    const newDriver = {
      id: Date.now(),
      name: driverName,
      phone: driverPhone,
      status: "Available", // Default status
    };
    setDrivers([...drivers, newDriver]);
    setDriverName("");
    setDriverPhone("");

    // Update mockShuttleData with the new driver
    mockShuttleData.drivers.push(newDriver);
    console.log(mockShuttleData.drivers);
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedDrivers = drivers.map((driver) =>
      driver.id === id ? { ...driver, status: newStatus } : driver
    );
    setDrivers(updatedDrivers);
  };

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-drivers p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Drivers</h2>
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Driver Phone"
          value={driverPhone}
          onChange={(e) => setDriverPhone(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button onClick={handleAddDriver} className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Driver
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Drivers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Available Drivers</h2>
      <ul>
        {filteredDrivers.map((driver) => (
          <li key={driver.id} className="border p-2 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{driver.name}</p>
                <p>ID: {driver.id}</p>
                <p>Phone: {driver.phone}</p>
                <p>Status: {driver.status}</p>
              </div>
              <div>
                <select
                  value={driver.status}
                  onChange={(e) => handleStatusChange(driver.id, e.target.value)}
                  className="px-4 py-2 border rounded bg-white text-sm"
                >
                  <option value="Available">Start Duty (Available)</option>
                  <option value="Not Available">End Duty (Not Available)</option>
                  <option value="On Break">On Break</option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDrivers;
