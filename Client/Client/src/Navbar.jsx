import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaHotel,
  FaCalendarAlt,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaCog,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { ISLogin, Role } from "./AUTH/Email";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-green-500 font-medium hover:text-black">
        <FaHome /> Home
      </Link>
      <Link to="/Search/Hotel" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-green-500 font-medium hover:text-black hover:font-mono">
        <FaHotel /> Search Hotel
      </Link>
      <Link to="/bookings" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-green-500 font-medium hover:text-black hover:font-mono">
        <FaCalendarAlt /> My Bookings
      </Link>
      <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-green-500 font-medium hover:text-black hover:font-mono">
        <FaHeart /> Wishlist
      </Link>

      {/* Profile Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-green-500 font-medium focus:outline-none"
        >
          <FaUser /> Profile
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-green-100/20 backdrop-blur-md rounded-xl shadow-lg py-2 flex flex-col z-50">
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-200/40 rounded-lg transition">
              <FaUser /> My Profile
            </Link>
            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-200/40 rounded-lg transition">
              <FaCog /> Settings
            </Link>
            {ISLogin ? (
              <Link to="/Logout" className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-200/40 rounded-lg transition">
                <FaSignOutAlt /> Logout
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-green-700 hover:bg-green-200/40 rounded-lg transition">
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
    <Link to="/Admin" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-purple-500 font-medium">
      <FaHome /> Dashboard
    </Link>
    <Link to="/admin/hotels" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-orange-400 font-medium">
      <FaHotel /> Hotels
    </Link>
    <Link to="/admin/bookings" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-orange-400 font-medium">
      <FaCalendarAlt /> Bookings
    </Link>
    <Link to="/admin/users" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-orange-400 font-medium">
      <FaUser /> Users
    </Link>

    {/* Admin Profile Dropdown */}
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition text-purple-500 font-medium focus:outline-none"
      >
        <FaUser /> Profile
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-purple-100/20 backdrop-blur-md rounded-xl shadow-lg py-2 flex flex-col z-50">
          <Link to="/admin/profile" className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:bg-purple-200/40 rounded-lg transition">
            <FaUser /> My Profile
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:bg-purple-200/40 rounded-lg transition">
            <FaCog /> Settings
          </Link>
          {ISLogin ? (
            <Link to="/Logout" className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:bg-purple-200/40 rounded-lg transition">
              <FaSignOutAlt /> Logout
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-purple-700 hover:bg-purple-200/40 rounded-lg transition">
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      )}
    </div>
  </>
);


  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="w-full">
        <div
          className={`flex justify-between items-center h-16 px-6 md:px-12 shadow-md rounded-b-xl backdrop-blur-md ${
            Role === "user" ? "bg-green-200/30" : "bg-orange-200/30"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to={Role === "user" ? "/" : "/Admin"}>
              <img
                src="https://tse2.mm.bing.net/th/id/OIP._PxenCnInwfF8Syr0D4UaAHaFj?pid=Api&P=0&h=180"
                alt="Logo"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </Link>
            <span className={`text-green-800 font-[cursive]  text-2xl font-bold tracking-wide`}>
              {Role === "user" ? "BookInn" : "Admin Panel"}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {Role === "user" ? userLinks : adminLinks}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/20 transition"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`md:hidden flex flex-col gap-2 p-4 mt-1 rounded-b-xl backdrop-blur-md ${
              Role === "user" ? "bg-green-200/30" : "bg-orange-200/30"
            }`}
          >
            {Role === "user" ? userLinks : adminLinks}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
