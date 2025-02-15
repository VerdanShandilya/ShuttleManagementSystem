import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await axios.put(`http://localhost:3000/bookings/${id}`, {
        status: "Cancelled",
      });
      fetchBookings(); // Fetch the latest bookings after cancelling
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  // Sort the bookings by date/time (descending)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA;
  });

  return (
    <div className="px-6 py-8">
      {/* Top header section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>
          <p className="text-sm text-gray-500">
            Manage and track your ride bookings
          </p>
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-sm text-gray-600 text-left font-semibold">
              <th className="py-3 px-4 w-1/4">Booking Details</th>
              <th className="py-3 px-4 w-1/4">Locations</th>
              <th className="py-3 px-4 w-1/5">Schedule</th>
              <th className="py-3 px-4 w-1/6">Status</th>
              <th className="py-3 px-4 w-1/6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {sortedBookings.map((booking, index) => {
              const isPastBooking = new Date(`${booking.date}T${booking.time}`) < new Date();
              return (
                <tr
                  key={booking._id || index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  {/* Booking Details */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-medium text-gray-800">
                          {booking.customer_name || "John Doe"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Booking #{index + 1}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Locations */}
                  <td className="py-4 px-4 align-top">
                    <div className="text-gray-800">
                      <span className="font-semibold">From:</span>{" "}
                      {booking.pickupLocation}
                    </div>
                    <div className="text-gray-800">
                      <span className="font-semibold">To:</span>{" "}
                      {booking.dropLocation}
                    </div>
                  </td>

                  {/* Schedule */}
                  <td className="py-4 px-4 align-top">
                    <div className="text-gray-800">
                      {new Date(booking.date).toISOString().split("T")[0]}
                    </div>
                    <div className="text-gray-800">{booking.time}</div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 align-top">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${
                          booking.status === "Ride Completed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : booking.status === "Arriving"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 align-top text-center">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={isPastBooking}
                      className={`px-3 py-2 rounded text-sm ${
                        isPastBooking
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
            {sortedBookings.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 px-4 text-center text-gray-500 text-sm"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;