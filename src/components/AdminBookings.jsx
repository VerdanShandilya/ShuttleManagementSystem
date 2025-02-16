import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOptions] = useState(["Pending", "Confirmed", "Cancelled"]);

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

  const handleEditBooking = (index) => {
    setEditingIndex(index);
    setEditDate(new Date(bookings[index].date).toISOString().split("T")[0]);
    setEditTime(bookings[index].time);
    setEditStatus(bookings[index].status || "Pending");
  };

  const handleSaveEdit = async (index) => {
    const updatedBooking = {
      ...bookings[index],
      date: editDate,
      time: editTime,
      status: editStatus,
    };

    try {
      await axios.put(
        `http://localhost:3000/bookings/${updatedBooking._id}`,
        updatedBooking
      );
      fetchBookings(); // Fetch the latest bookings after saving
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  // Filter by search term (customer name)
  const filteredBookings = bookings.filter((booking) =>
    booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the bookings by date/time descending
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA;
  });

  return (
    <div className="p-6">
      {/* Top header section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>
          <p className="text-sm text-gray-500">
            Manage and track your ride bookings
          </p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          All Bookings
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Bookings"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
            {sortedBookings.map((booking, index) => (
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
                  {editingIndex === index ? (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-2">
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-sm"
                      />
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="p-2 border border-gray-300 rounded bg-white text-sm"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSaveEdit(index)}
                        className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditBooking(index)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
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

export default AdminBookings;