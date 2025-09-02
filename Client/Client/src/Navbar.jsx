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
  FaHome,
  FaClipboardList,
  FaUsers,
  FaPlusCircle,
  FaChartLine,
} from "react-icons/fa";
import { ISLogin, Role } from "./AUTH/Email";

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
    <>
      {Role === "user" ? (
        /* ================== USER NAVBAR ================== */
        <nav className="fixed top-0 left-0 w-full bg-amber-100 shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover mr-2 cursor-pointer"
                  />
                </Link>
                <span className="text-xl font-bold text-gray-800">BookInn</span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                  <FaHome /> Home
                </Link>
                <Link to="/Search/Hotel" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                  <FaHotel /> Search Hotel
                </Link>
                <Link to="/bookings" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                  <FaCalendarAlt /> My Bookings
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
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
                    <div className="absolute right-0 mt-2 w-48 bg-amber-100 border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100">
                        <FaUser /> My Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100">
                        <FaCog /> Settings
                      </Link>

                      {ISLogin ? (
                        <Link to="/Logout" className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100">
                          <FaSignOutAlt /> Logout
                        </Link>
                      ) : (
                        <Link to="/login">
                          <div className="flex items-center gap-2 px-4 py-2 text-blue-700 hover:bg-gray-100">
                            <FaSignInAlt /> Login
                          </div>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                  {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        /* ================== ADMIN NAVBAR ================== */
        <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/admin/dashboard">
                  <span className="text-xl font-bold text-white">Admin Panel</span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 items-center text-gray-200">
                <Link to="/admin/dashboard" className="hover:text-blue-400 flex items-center gap-1">
                  <FaChartLine /> Dashboard
                </Link>
                <Link to="/admin/hotels" className="hover:text-blue-400 flex items-center gap-1">
                  <FaHotel /> Manage Hotels
                </Link>
                <Link to="/admin/bookings" className="hover:text-blue-400 flex items-center gap-1">
                  <FaClipboardList /> Bookings
                </Link>
                <Link to="/admin/users" className="hover:text-blue-400 flex items-center gap-1">
                  <FaUsers /> Users
                </Link>
                <Link to="/admin/add-hotel" className="hover:text-blue-400 flex items-center gap-1">
                  <FaPlusCircle /> Add Hotel
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hover:text-blue-400 flex items-center gap-1 focus:outline-none"
                  >
                    <FaUser /> Profile
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 border border-gray-600 rounded-lg shadow-lg py-2 z-50">
                      <Link to="/admin/profile" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-600">
                        <FaUser /> My Profile
                      </Link>
                      <Link to="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-600">
                        <FaCog /> Settings
                      </Link>

                      {ISLogin ? (
                        <Link to="/Logout" className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-600">
                          <FaSignOutAlt /> Logout
                        </Link>
                      ) : (
                        <Link to="/login">
                          <div className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-600">
                            <FaSignInAlt /> Login
                          </div>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                  {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
