import { useState } from "react";
import { mockShuttleData } from "../utils/mockData";

const BookingForm = ({ onSubmit }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = { pickup, dropoff, date, time };
    onSubmit(booking);
    setPickup("");
    setDropoff("");
    setDate("");
    setTime("");
  };

  const availableDropoffLocations = mockShuttleData.campus.places.filter(
    (place) => place !== pickup
  );

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
      <select
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="p-2 border m-2"
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
      <select
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
        className="p-2 border m-2"
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
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border m-2"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 border m-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Book
      </button>
    </form>
  );
};

export default BookingForm;