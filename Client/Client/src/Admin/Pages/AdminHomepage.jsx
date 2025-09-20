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
import Loader from "../Loaders/Loader";

const bookings = [
  { id: 1, user: "John Doe", hotel: "Ocean View", status: "Approved", date: "2025-09-05" },
  { id: 2, user: "Jane Smith", hotel: "Mountain Stay", status: "Pending", date: "2025-09-06" },
  { id: 3, user: "David Lee", hotel: "City Inn", status: "Rejected", date: "2025-09-06" },
];

function AdminHomepage() {
  return (
    <>
      {/* Navbar stays fixed on top */}
      <Navbar />

      <div className="flex bg-gradient-to-br from-blue-100 via-white to-blue-200 min-h-screen mt-10">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-xl pt-24 pb-6 fixed top-0 left-0 h-screen">
          {/* Logo / Title */}
          <div className="px-6 text-xl font-extrabold text-blue-600 mb-8">
            🏨 Hotel Admin
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-blue-600 bg-blue-100 hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <FaClipboardList /> <span>Bookings</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:scale-[1.02] transition-all"
            >
              <FaHotel /> <span>Hotels</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:scale-[1.02] transition-all"
            >
              <FaUsers /> <span>Users</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:scale-[1.02] transition-all"
            >
              <FaMoneyBill /> <span>Reports</span>
            </a>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 mt-8 text-sm text-gray-500">
            © 2025 Hotel Admin
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6 md:p-10 pt-24">
          {/* Topbar inside page */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              📊 Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-600">
                Welcome, <span className="text-blue-600">Admin</span>
              </span>
              <button className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-xl shadow-md hover:scale-105 transition">
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: <FaClipboardList />, color: "text-blue-500", number: "120", label: "Total Bookings" },
              { icon: <FaHotel />, color: "text-green-500", number: "15", label: "Hotels" },
              { icon: <FaUsers />, color: "text-purple-500", number: "85", label: "Users" },
              { icon: <FaMoneyBill />, color: "text-yellow-500", number: "$25k", label: "Revenue" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-all flex flex-col items-center"
              >
                <div className={`${card.color} text-3xl mb-2`}>{card.icon}</div>
                <h2 className="text-2xl font-bold">{card.number}</h2>
                <p className="text-gray-500">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              Recent Bookings
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-100 text-left rounded-xl">
                    {["ID", "User", "Hotel", "Status", "Date", "Action"].map((header, idx) => (
                      <th key={idx} className="p-3 font-semibold text-gray-600">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="bg-white shadow-sm rounded-xl hover:shadow-md transition"
                    >
                      <td className="p-3">{b.id}</td>
                      <td className="p-3 font-medium">{b.user}</td>
                      <td className="p-3">{b.hotel}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : b.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3 flex flex-col sm:flex-row gap-2 justify-center">
                        <button className="px-4 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 flex items-center gap-1 shadow hover:scale-105 transition">
                          <FaCheck /> Approve
                        </button>
                        <button className="px-4 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 flex items-center gap-1 shadow hover:scale-105 transition">
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
      <Loader></Loader>
    </>
  );
}

export default AdminHomepage;
