import React, { useState } from "react";
import {
  FaEdit,
  FaRegSave,
  FaUser,
  FaHotel,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import MyBookings from "./MyBookings";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const initialProfile = {
  name: "John Doe",
  email: "johndoe@email.com",
  phone: "+91 9876543210",
  location: "Bangalore, India",
  bio: "Professional traveler and hotel reviewer.",
  image: null,
};

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [preview, setPreview] = useState(profile.image);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
    setForm(profile);
    setPreview(profile.image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setPreview(URL.createObjectURL(file));
      setForm({ ...form, image: file });
    } else {
      alert("File too large! Max 2MB.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...form, image: preview });
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative animate-fadeIn">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Edit Profile
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-3">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center">
                    <span className="text-gray-300">No Image</span>
                  </div>
                )}
                <label className="mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded cursor-pointer hover:bg-blue-100">
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows={3}
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <FaRegSave /> Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Page */}
      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Profile Card */}
          <div className="  flex flex-col md:flex-row items-center p-10 gap-10 mt-7 ">
            {/* Profile Image with subtle gradient */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 mt-7 hover:shadow-2xl transition duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    src={
                      profile.image ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="Profile"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                        {profile.name}
                      </h2>
                      <p className="text-gray-500 mt-1">{profile.email}</p>
                      {profile.phone && (
                        <p className="text-gray-500 mt-1">{profile.phone}</p>
                      )}
                      {profile.location && (
                        <p className="text-gray-500 mt-1">{profile.location}</p>
                      )}
                    </div>
                    <button
                      className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition duration-300"
                      onClick={toggleModal}
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>

                  {profile.bio && (
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUser className="text-4xl text-blue-500 mb-2" />,
                label: "Total Bookings",
                value: 12,
              },
              {
                icon: <FaHotel className="text-4xl text-green-500 mb-2" />,
                label: "Saved Hotels",
                value: 5,
              },
              {
                icon: <FaCog className="text-4xl text-yellow-500 mb-2" />,
                label: "Preferences Set",
                value: 4,
              },
              {
                icon: <FaSignOutAlt className="text-4xl text-red-500 mb-2" />,
                label: "Account Actions",
                value: 3,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-2xl transition duration-300 w-full"
              >
                {stat.icon}
                <p className="text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bookings & Saved Hotels */}
          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Your Saved
              </h3>
              <MyBookings regnav={false} />
            </div>
          </div>

          {/* Preferences & Account Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                Preferences
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Receive Newsletter", checked: true },
                  {
                    label: "Enable Notifications",
                    checked: false,
                    path: "/EmailNotification",
                  },
                  { label: "Dark Mode", checked: true },
                ].map((pref, i) => (
                  <Link to={pref?.path} key={i}>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm">
                      <span>{pref.label}</span>
                      <input
                        type="checkbox"
                        checked={pref.checked}
                        readOnly
                        className="w-5 h-5"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 w-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                Account Actions
              </h3>
              <div className="flex flex-col gap-4">
                <button className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-xl text-red-600 font-medium transition flex items-center gap-3">
                  <FaSignOutAlt /> Logout
                </button>
                <Link to="/PasswordManage">
                  <button className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-600 font-medium transition flex items-center gap-3">
                    <FaCog /> Change Password
                  </button>
                </Link>
                <Link to="/">
                  <button className="w-full text-left p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl text-yellow-600 font-medium transition flex items-center gap-3">
                    <FaUser /> Delete Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
