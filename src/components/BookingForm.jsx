import { useState } from "react";
import { mockShuttleData } from "../utils/mockData";

const BookingForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = { name, pickup, dropoff, date, time };
    onSubmit(booking);
    setName("");
    setPickup("");
    setDropoff("");
    setDate("");
    setTime("");
  };

  const availableDropoffLocations = mockShuttleData.campus.places.filter(
    (place) => place !== pickup
  );

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get current time in HH:MM format
  const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
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
            min={today} // Set the minimum date to today
          />
        </div>
        <div>
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            min={date === today ? currentTime : "00:00"} // Set the minimum time to current time if the date is today
            disabled={!date} // Disable time input until a date is selected
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
  );
};

export default BookingForm;