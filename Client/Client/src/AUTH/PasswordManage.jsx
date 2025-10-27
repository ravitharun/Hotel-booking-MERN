import React, { useState } from "react";
import Navbar from "../Navbar";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordManage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password updated successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Change Your Password 🔐
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Current Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                New Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Confirm Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700"
                  placeholder="Re-enter new password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordManage;
