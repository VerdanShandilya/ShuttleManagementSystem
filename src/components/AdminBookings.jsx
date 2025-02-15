import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [editStatus, setEditStatus] = useState("Pending");
  const [statusOptions] = useState([
    "Pending", "Confirmed","Cancelled"
  ]);

  useEffect(() => {
    // Fetch bookings from the backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleEditBooking = (index) => {
    setEditingIndex(index);
    setEditDate(new Date(bookings[index].date).toISOString().split("T")[0]);
    setEditTime(bookings[index].time);
    
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
      const updatedBookings = [...bookings];
      updatedBookings[index] = updatedBooking;
      setBookings(updatedBookings);
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };


  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold">
              <th className="p-3 border">Booking ID</th>
              <th className="p-3 border">Booked By</th>
              <th className="p-3 border">From</th>
              <th className="p-3 border">To</th>
              <th className="p-3 border">Pickup </th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking, index) => (
              <React.Fragment key={index}>
                <tr className="border hover:bg-gray-50 text-sm">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{booking.customer_name}</td>
                  <td className="p-3 border">{booking.pickupLocation}</td>
                  <td className="p-3 border">{booking.dropLocation}</td>
                  <td className="p-3 border">
                    {new Date(booking.date).toISOString().split("T")[0]} {" "}{booking.time}
                    </td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        booking.status === "Ride Completed"
                          ? "bg-green-500"
                          : booking.status === "Cancelled"
                          ? "bg-red-500"
                          : booking.status === "Arriving"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() =>
                        setExpandedRow(expandedRow === index ? null : index)
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                    >
                      More
                    </button>
                  </td>
                </tr>
                {/* More Options Row */}
                {expandedRow === index && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="p-3 border">
                      <div className="flex items-center space-x-3">
                        {/* Edit Booking */}
                        {editingIndex === index ? (
                          <div className="flex space-x-2">
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="p-2 border rounded"
                            />
                            <input
                              type="time"
                              value={editTime}
                              onChange={(e) => setEditTime(e.target.value)}
                              className="p-2 border rounded"
                            />

                            {/* Status Dropdown */}
                            <select
                              value={booking.status || "Pending"}
                              className="px-4 py-2 border rounded bg-white text-sm"
                              onChange={(e) => setEditStatus(e.target.value)}
                            >
                              {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={() => handleSaveEdit(index)}
                              className="px-4 py-2 bg-green-600 text-white rounded text-sm"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditBooking(index)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded text-sm"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
