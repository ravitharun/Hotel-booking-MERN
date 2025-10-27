import React, { useState } from "react";
import Navbar from "../Navbar";
import { FaBell, FaEnvelope } from "react-icons/fa";

function EmailNotification() {
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notifications && email) {
      alert(`Notifications enabled for ${email}`);
    } else {
      alert("Please enter a valid email and enable notifications!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-200 p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-6 flex items-center justify-center gap-2">
            <FaBell className="text-green-600" /> Enable Notifications
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Notification Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notifications"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label
                htmlFor="notifications"
                className="text-gray-700 text-sm cursor-pointer"
              >
                Receive booking and password update alerts
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Save Notification Settings
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Stay updated with hotel booking alerts ✉️
          </p>
        </div>
      </div>
    </>
  );
}

export default EmailNotification;
