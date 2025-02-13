import React, { useState, useEffect } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleCancelBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  const handleRemoveBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  const isBookingTimePassed = (booking) => {
    const currentTime = new Date();
    const bookingTime = new Date(`${booking.date}T${booking.time}`);
    return currentTime >= bookingTime;
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA;
  });

  return (
    <div className="admin-bookings p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Bookings</h2>
      <ul>
        {sortedBookings.map((booking, index) => (
          <li key={index} className="border p-2 mb-2">
            {booking.pickup} to {booking.dropoff} at {booking.time} on {booking.date}
            {isBookingTimePassed(booking) ? (
              <button
                onClick={() => handleRemoveBooking(index)}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => handleCancelBooking(index)}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBookings;