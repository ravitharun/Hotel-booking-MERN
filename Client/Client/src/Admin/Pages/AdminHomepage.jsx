import React from "react";
import Navbar from "../../Navbar";
import {
  FaHotel,
  FaUsers,
  FaClipboardList,
  FaMoneyBill,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

// Example bookings data
const bookings = [
  { id: 1, user: "John Doe", hotel: "Ocean View", status: "Approved", date: "2025-09-05" },
  { id: 2, user: "Jane Smith", hotel: "Mountain Stay", status: "Pending", date: "2025-09-06" },
  { id: 3, user: "David Lee", hotel: "City Inn", status: "Rejected", date: "2025-09-06" },
];

function AdminHomepage() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white/90 backdrop-blur-xl shadow-xl border-r rounded-tr-3xl rounded-br-3xl hidden md:flex flex-col">
          <div className="p-6 text-2xl font-extrabold text-blue-600 border-b">🏨 Hotel Admin</div>
          <nav className="mt-6 space-y-3 px-4 flex-1">
            <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-xl font-semibold text-blue-600 bg-blue-100 shadow-sm hover:scale-105 transition">
              <FaClipboardList /> <span>Bookings</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:scale-105 transition">
              <FaHotel /> <span>Hotels</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:scale-105 transition">
              <FaUsers /> <span>Users</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:scale-105 transition">
              <FaMoneyBill /> <span>Reports</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Topbar */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">📊 Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-600">Welcome, <span className="text-blue-600">Admin</span></span>
              <button className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-lg transition">
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center">
              <FaClipboardList className="text-blue-500 text-3xl mb-2" />
              <h2 className="text-2xl font-bold">120</h2>
              <p className="text-gray-500">Total Bookings</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center">
              <FaHotel className="text-green-500 text-3xl mb-2" />
              <h2 className="text-2xl font-bold">15</h2>
              <p className="text-gray-500">Hotels</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center">
              <FaUsers className="text-purple-500 text-3xl mb-2" />
              <h2 className="text-2xl font-bold">85</h2>
              <p className="text-gray-500">Users</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow hover:shadow-2xl transition flex flex-col items-center">
              <FaMoneyBill className="text-yellow-500 text-3xl mb-2" />
              <h2 className="text-2xl font-bold">$25k</h2>
              <p className="text-gray-500">Revenue</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <section className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow mb-6">
            <h2 className="text-2xl font-semibold mb-5">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-100 text-left rounded-xl">
                    <th className="p-3">ID</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Hotel</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="bg-white shadow rounded-xl hover:shadow-md transition">
                      <td className="p-3">{b.id}</td>
                      <td className="p-3 font-medium">{b.user}</td>
                      <td className="p-3">{b.hotel}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          b.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : b.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3 flex flex-col sm:flex-row gap-2 justify-center">
                        <button
                          className="px-4 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 flex items-center gap-1 shadow"
                          title="Approve Booking"
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          className="px-4 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 flex items-center gap-1 shadow"
                          title="Reject Booking"
                        >
                          <FaTimes /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default AdminHomepage;
