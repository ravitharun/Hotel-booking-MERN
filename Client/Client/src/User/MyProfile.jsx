import React, { useState } from "react";
import { FaEdit, FaRegSave } from "react-icons/fa";
import MyBookings from "./MyBookings";
import Navbar from "../Navbar";

// Helper for initial profile state
const initialProfile = {
  name: "John Doe",
  email: "johndoe@email.com",
  phone: "",
  location: "",
  bio: "",
  image: null,
};

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [preview, setPreview] = useState(profile.image);

  // Modal toggle
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
    setForm(profile);
    setPreview(profile.image);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      setPreview(URL.createObjectURL(file));
      setForm({ ...form, image: file });
    } else {
      alert("File too large! Please upload under 2MB.");
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save Profile
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...form, image: preview });
    setModalOpen(false);
  };

  // Step indicator UI
  const StepBar = () => (
    <div className="flex mb-6 items-center justify-center gap-4">
      <div className="flex items-center">
        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
        <span className="text-sm text-blue-700 font-semibold">Profile</span>
      </div>
      <div className="w-8 h-1 bg-blue-200"></div>
      <div className="flex items-center opacity-50">
        <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
        <span className="text-sm text-gray-500">Review</span>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Profile Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-7 relative animate-fadeIn">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl focus:outline-none"
            >
              &times;
            </button>
            <StepBar />
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Edit Your Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center justify-center gap-3">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-300">No Image</span>
                  </div>
                )}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                  <span className="text-xs text-gray-400">
                    PNG, JPG (Max: 2MB)
                  </span>
                  <span className="mt-2 text-sm font-medium text-blue-600">
                    Click/Drag to upload
                  </span>
                </label>
              </div>

              {/* Editable Form */}
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Write a short bio..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <FaRegSave />
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Profile Page */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4 transition mt-20">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 animate-profileCard">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={
                profile.image || "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover shadow"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-base text-gray-600">{profile.email}</p>
              {profile.location && (
                <p className="text-sm text-gray-500 mt-1">
                  Location: {profile.location}
                </p>
              )}
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
                onClick={toggleModal}
              >
                <FaEdit className="text-md" /> Edit Profile
              </button>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <>
              <hr className="my-7" />
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  About Me
                </h3>
                <p className="text-gray-500">{profile.bio}</p>
              </div>
            </>
          )}

          {/* Booking History (Downside Section) */}
          <hr className="my-6" />
          <MyBookings />
        </div>
      </div>
    </>
  );
};

export default MyProfile;
