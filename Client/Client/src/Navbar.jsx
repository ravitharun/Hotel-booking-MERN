import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHotel,
  FaUser,
  FaHeart,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // profile dropdown
  const dropdownRef = useRef(null);

  // close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-amber-100 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover mr-2 cursor-pointer"
            />
            <span className="text-xl font-bold text-gray-800">BookInn</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              <FaHotel /> Hotels
            </Link>
            <Link
              to="/bookings"
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              <FaCalendarAlt /> My Bookings
            </Link>
            <Link
              to="/wishlist"
              className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
            >
              <FaHeart /> Wishlist
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-700 hover:text-blue-600 flex items-center gap-1 focus:outline-none"
              >
                <FaUser /> Profile
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-blend-color border rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser /> My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaCog /> Settings
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignInAlt /> Login
                  </Link>
                  <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 flex items-center gap-2"
            >
              <FaHotel /> Hotels
            </Link>
            <Link
              to="/bookings"
              className="block text-gray-700 hover:text-blue-600 flex items-center gap-2"
            >
              <FaCalendarAlt /> My Bookings
            </Link>
            <Link
              to="/wishlist"
              className="block text-gray-700 hover:text-blue-600 flex items-center gap-2"
            >
              <FaHeart /> Wishlist
            </Link>

            {/* Profile Dropdown in Mobile */}
            <details className="block">
              <summary className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-600">
                <FaUser /> Profile
              </summary>
              <div className="ml-6 mt-2 space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <FaUser /> My Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <FaCog /> Settings
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <FaSignInAlt /> Login
                </Link>
                <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </details>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
