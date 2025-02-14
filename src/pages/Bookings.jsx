
import React, { useState } from "react";
import BookingForm from "../components/BookingForm";

const Bookings = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const handleBookingSubmit = (booking) => {
    const savedBookings = sessionStorage.getItem("bookings");
    const bookings = savedBookings ? JSON.parse(savedBookings) : [];
    const updatedBookings = [...bookings, booking];
    sessionStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setSuccessMessage("Shuttle booked successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="bookings-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Shuttle Bookings</h1>
      {successMessage && (
        <div className="text-green-600 text-center mb-4">
          {successMessage}
        </div>
      )}
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default Bookings;