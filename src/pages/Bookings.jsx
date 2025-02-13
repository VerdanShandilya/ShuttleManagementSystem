import React from "react";
import BookingForm from "../components/BookingForm";

const Bookings = () => {
  const handleBookingSubmit = (booking) => {
    const savedBookings = localStorage.getItem("bookings");
    const bookings = savedBookings ? JSON.parse(savedBookings) : [];
    const updatedBookings = [...bookings, booking];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="bookings-page p-6">
      <h1 className="text-2xl font-bold mb-4">Shuttle Bookings</h1>
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default Bookings;