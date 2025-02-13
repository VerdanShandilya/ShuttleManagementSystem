import React, { useState } from "react";

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [driverName, setDriverName] = useState("");

  const handleAddDriver = () => {
    if (!driverName) return;
    setDrivers([...drivers, { id: Date.now(), name: driverName }]);
    setDriverName("");
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
        <button onClick={handleAddDriver} className="px-4 py-2 bg-blue-600 text-white rounded">
          Add Driver
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Available Drivers</h2>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.id} className="border p-2">
            {driver.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDrivers;