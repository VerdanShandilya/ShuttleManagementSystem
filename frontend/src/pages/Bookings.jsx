import React, { useState } from "react";
import axios from "axios";
import {mockShuttleData} from '../utils/mockData'

const Bookings = () => {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const booking = {customer_name:name, pickupLocation:pickup, dropLocation:dropoff, date, time };

    try {
      await axios.post(
        "http://localhost:3000/bookings",
        booking,
        {
          headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage("Shuttle booked successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      setName("");
      setPickup("");
      setDropoff("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error booking shuttle:", error);
    }
  };

  const availableDropoffLocations = mockShuttleData.campus.places.filter(
    (place) => place !== pickup
  );

  return (
    <div className="bookings-page p-6 bg-gray-100 min-h-screen">
      {successMessage && (
        <div className="text-green-600 text-center mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleBookingSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Book Your Shuttle</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Pickup Location</label>
            <select
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="" disabled>
                Select Pickup Location
              </option>
              {mockShuttleData.campus.places.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Dropoff Location</label>
            <select
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="" disabled>
                Select Dropoff Location
              </option>
              {availableDropoffLocations.map((place) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default Bookings;
