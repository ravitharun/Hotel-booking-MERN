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
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown
  const dropdownRef = useRef(null);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userLinks = (
    <>
      <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
        <FaHome /> Home
      </Link>
      <Link to="/Search/Hotel" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
        <FaHotel /> Search Hotel
      </Link>
      <Link to="/bookings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
        <FaCalendarAlt /> My Bookings
      </Link>
      <Link to="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
        <FaHeart /> Wishlist
      </Link>

      {/* Profile Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full text-left px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-200 focus:outline-none"
        >
          <FaUser /> Profile
        </button>
        {dropdownOpen && (
          <div className="pl-6">
            <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
              <FaUser /> My Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
              <FaCog /> Settings
            </Link>
            {ISLogin ? (
              <Link to="/Logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </Link>
            ) : (
              <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );

  const adminLinks = (
    <>
      <Link to="/Admin" className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2">
        <FaChartLine /> Dashboard
      </Link>
      <Link to="/admin/hotels" className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2">
        <FaHotel /> Manage Hotels
      </Link>
      <Link to="/admin/bookings" className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2">
        <FaClipboardList /> Bookings
      </Link>
      <Link to="/admin/users" className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2">
        <FaUsers /> Users
      </Link>
      <Link to="/admin/add-hotel" className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center gap-2">
        <FaPlusCircle /> Add Hotel
      </Link>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full text-left px-4 py-2 flex items-center gap-2 text-white hover:bg-gray-700 focus:outline-none"
        >
          <FaUser /> Profile
        </button>
        {dropdownOpen && (
          <div className="pl-6">
            <Link to="/admin/profile" className="block px-4 py-2 text-white hover:bg-gray-600 flex items-center gap-2">
              <FaUser /> My Profile
            </Link>
            <Link to="/admin/settings" className="block px-4 py-2 text-white hover:bg-gray-600 flex items-center gap-2">
              <FaCog /> Settings
            </Link>
            {ISLogin ? (
              <Link to="/Logout" className="block px-4 py-2 text-white hover:bg-gray-600 flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </Link>
            ) : (
              <Link to="/login" className="block px-4 py-2 text-white hover:bg-gray-600 flex items-center gap-2">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <nav className={`${Role === "user" ? "bg-amber-100" : "bg-gray-800"} fixed w-full top-0 z-50 shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {Role === "user" ? (
              <>
                <Link to="/">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
                    alt="Logo"
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
                <span className="text-xl font-bold text-gray-800">BookInn</span>
              </>
            ) : (
              <Link to="/Admin">
                <span className="text-xl font-bold text-white">Admin Panel</span>
              </Link>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {Role === "user" ? userLinks : adminLinks}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${Role === "user" ? "text-gray-700" : "text-white"}`}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden ${Role === "user" ? "bg-amber-100" : "bg-gray-800"} pt-2 pb-4 flex flex-col`}>
            {Role === "user" ? userLinks : adminLinks}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
