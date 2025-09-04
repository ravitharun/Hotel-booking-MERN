import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const BookingsAdminUI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Sample booking counts
  const totalBookings = 10;
  const statusCounts = { Pending: 3, Approved: 5, Rejected: 2 };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Hotel Bookings</h2>

      {/* Booking Counts */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="px-4 py-2 bg-gray-100 rounded shadow">
          Total Bookings: <span className="font-semibold">{totalBookings}</span>
        </div>
        <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded shadow">
          Pending: {statusCounts.Pending}
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded shadow">
          Approved: {statusCounts.Approved}
        </div>
        <div className="px-4 py-2 bg-red-100 text-red-800 rounded shadow">
          Rejected: {statusCounts.Rejected}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div className="flex items-center border rounded-lg overflow-hidden w-full md:w-1/3">
          <FaSearch className="text-gray-400 px-2" />
          <input
            type="text"
            placeholder="Search by user, hotel, or location..."
            className="w-full px-3 py-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm w-max">
        <input
          type="checkbox"
          id="selectAll"
          className="h-4 w-4 text-blue-600 border-gray-400 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="selectAll"
          className="text-gray-700 font-medium cursor-pointer"
        >
          Select All
        </label>
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Bulk Action",
                "ID",
                "User",
                "Hotel",
                "Location",
                "Check-In",
                "Check-Out",
                "Rooms",
                "Price",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((id) => (
              <tr
                key={id}
                className={`transition-all duration-200 bg-white hover:bg-gray-100`}
              >
                <td className="px-6 py-4 flex justify-center items-center">
                  <input type="checkbox" className="h-4 w-4" />
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">{id}</td>
                <td className="px-6 py-4 text-gray-700">User {id}</td>
                <td className="px-6 py-4 text-gray-700">Hotel {id}</td>
                <td className="px-6 py-4 text-gray-700">Location {id}</td>
                <td className="px-6 py-4 text-gray-700">2025-09-0{id}</td>
                <td className="px-6 py-4 text-gray-700">2025-09-1{id}</td>
                <td className="px-6 py-4 text-gray-700">{id}</td>
                <td className="px-6 py-4 text-gray-700">₹{id * 1000}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow">
                    Approve
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsAdminUI;
