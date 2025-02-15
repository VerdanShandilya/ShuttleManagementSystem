import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");

  useEffect(() => {
    // Fetch drivers from the API
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/drivers");
        console.log(response.data);
        

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
      const response = await axios.put(`http://localhost:3000/drivers/${id}`, { currentStatus: newStatus });
      const updatedDrivers = drivers.map((driver) =>
        driver._id === id ? response.data : driver
      );
      setDrivers(updatedDrivers);
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  return (
    <div className="admin-drivers p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Drivers</h2>
      <div className="mb-4">
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

      <h2 className="text-xl font-semibold mb-2">Available Drivers</h2>
      <ul>
        {drivers.map((driver) => (
          <li key={driver._id} className="border p-2 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-2xl">{driver.name}</p>
                <p>ID: {driver._id.slice(-5)}</p>
                <p>Phone: {driver.phone}</p>
                <p>Status: {driver.currentStatus}</p>
              </div>
              <div>
                <select
                  value={driver.currentStatus}
                  onChange={(e) => handleStatusChange(driver._id, e.target.value)}
                  className="px-4 py-2 border rounded bg-white text-sm"
                >
                  <option value="Available">Start Duty (Available)</option>
                  <option value="Unavailable">End Duty (Unavailable)</option>
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