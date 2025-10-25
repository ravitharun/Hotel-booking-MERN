import React, { useState } from "react";
import Navbar from "../../Navbar";
import { useEffect } from "react";
import axios from 'axios'
import { email } from "../../AUTH/Email";
function Report() {
  const [issues, setIssues] = useState([
    {
      id: "001",
      user: "John Doe",
      email: "john@example.com",
      bookingId: "BKG-1001",
      type: "Payment",
      description: "Payment failed but amount deducted",
      status: "Pending",
      date: "2025-09-30",
    },
    {
      id: "002",
      user: "Sara Smith",
      email: "sara@example.com",
      bookingId: "BKG-1010",
      type: "Room",
      description: "Room not cleaned properly",
      status: "Resolved",
      date: "2025-09-29",
    },
    {
      id: "003",
      user: "Alex Brown",
      email: "alex@example.com",
      bookingId: "BKG-1020",
      type: "Booking Error",
      description: "Double booking issue",
      status: "In Progress",
      date: "2025-09-28",
    },
  ]);

  const handleMarkResolved = (id) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === id ? { ...issue, status: "Resolved" } : issue
    );
    setIssues(updatedIssues);
  };
// const 


  return (
    <>
    <Navbar/>
    
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Issues</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Issue ID",
                "User",
                "Email",
                "Booking ID",
                "Issue Type",
                "Description",
                "Status",
                "Date Reported",
                "Action",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{issue.id}</td>
                <td className="px-6 py-3">{issue.user}</td>
                <td className="px-6 py-3">{issue.email}</td>
                <td className="px-6 py-3">{issue.bookingId}</td>
                <td className="px-6 py-3">{issue.type}</td>
                <td className="px-6 py-3">{issue.description}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      issue.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : issue.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td className="px-6 py-3">{issue.date}</td>
                <td className="px-6 py-3">
                  {issue.status !== "Resolved" && (
                    <button
                      onClick={() => handleMarkResolved(issue.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Mark Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>

  );
}

export default Report;
