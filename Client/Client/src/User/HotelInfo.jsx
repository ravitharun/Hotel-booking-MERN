import React, { useState } from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
  FaRupeeSign,
  FaBuilding,
} from "react-icons/fa";
import axios from "axios";

import UserLivelocation from "./Location/UserLivelocation";
import { FiChevronDown } from "react-icons/fi";
import Cooment from "./Cooment";
import { email } from "../AUTH/Email";
import toast, { Toaster } from "react-hot-toast";
import PaymentIcons from "./PaymentIcons";

export default function HotelInfo() {
  const { state } = useLocation();
  const Data = state?.Data || [];
  const hotel = Data[0] || {};

  const fallbackImages = [
  
  ];
  const hotelImages =
    hotel.images && hotel.images.length > 0 ? hotel.images : fallbackImages;

  const [openIndex, setOpenIndex] = useState(null);
  const [Booking, setBooking] = useState(true);
  const [RequiredRooms, setRequiredRooms] = useState("");
  const [BookingCheckIn, setBookingCheckIn] = useState("");
  const [BookingCheckOut, setBookingCheckOut] = useState("");

  const faqs = [
    {
      question: "How can I cancel my booking?",
      answer:
        "You can cancel your booking from the 'My Bookings' page. Just click on the Cancel button next to your reservation.",
    },
    {
      question: "Is breakfast included in all bookings?",
      answer:
        "It depends on the hotel. You can check the booking details to see if meals are included.",
    },
    {
      question: "Can I book hotels without advance payment?",
      answer:
        "Yes, some hotels offer a 'Pay at Hotel' option. You’ll see this during checkout.",
    },
    {
      question: "Do hotels allow early check-in?",
      answer:
        "Early check-in is subject to availability. It’s best to contact the hotel directly after booking.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const BookHotel = async (Hotelid) => {
    if (!RequiredRooms || !BookingCheckIn || !BookingCheckOut) {
      return toast.error("Please fill all required fields.");
    }

    try {
      const BookingData = {
        HotelBookingId: Hotelid,
        RequiredRooms,
        BookingCheckIn,
        BookingCheckOut,
        UserEmail: email,
      };

      const response = await axios.post(
        "http://localhost:5000/Hotel/booking/HotelBooking",
        BookingData
      );

      const message = response.data.message || "Booking Successful!";

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <span className="text-2xl">🏨</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Booking Status</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    } catch (err) {
      toast.error("Booking failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      {/* Hero Section */}
      <div className="relative h-96 w-full bg-gray-200">
        <img
          src={hotelImages[0]}
          alt="Hotel"
          className="w-full h-full object-cover brightness-90"
          onError={(e) => {
            e.target.src = fallbackImages[0];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 flex flex-col justify-end p-6">
          <h1 className="text-4xl font-bold text-white">
            {hotel.name || "Hotel Name"}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-yellow-400">
            <FaStar />
            <span className="font-semibold">{hotel.rating || 0}</span>
            <span className="text-white/70 text-sm">
              ({hotel.reviewsCount || 0} reviews)
            </span>
          </div>
          <p className="text-white mt-2">{hotel.chain || "Hotel Chain"}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description & Location */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-2">About this hotel</h2>
            <p className="text-gray-700">{hotel.description || "No description available"}</p>
            {hotel.location && (
              <div className="mt-4 flex items-start gap-2 text-gray-600">
                <FaMapMarkerAlt className="mt-1 text-red-500" />
                <div>
                  <p>{hotel.location.address}</p>
                  <p>
                    {hotel.location.city}, {hotel.location.state}, {hotel.location.country} - {hotel.location.zipcode}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {hotel.location.distanceFromAirport} from airport,{" "}
                    {hotel.location.distanceFromRailwayStation} from railway station
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Rooms */}
          {hotel.rooms?.length > 0 ? (
            hotel.rooms.map((room) => (
              <div key={room.roomId} className="bg-white p-6 rounded-2xl shadow space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{room.type}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    <span>{hotel.starCategory || 5}</span>
                  </div>
                </div>

                <p className="text-gray-600">{room.size}</p>

                {/* Room Images */}
                <div className="flex gap-2 overflow-x-auto">
                  {hotelImages.slice(0, 5).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Room ${index}`}
                      className="w-40 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>

                {/* Room Details */}
                <div className="flex flex-wrap gap-6 text-gray-700 mt-2">
                  <div className="flex items-center gap-1">
                    <FaBed className="text-blue-500" />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-green-500" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-yellow-600" />
                    <span className="font-bold text-green-600">{room.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">/ night</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {room.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                    >
                      <FaBuilding className="w-3 h-3" />
                      {facility}
                    </span>
                  ))}
                </div>

                <p className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <FaBed className="text-indigo-500 w-5 h-5" />
                  <span>
                    <span
                      className={`${
                        room.available <= 15
                          ? "text-red-600 font-bold text-lg"
                          : "text-green-600 font-semibold"
                      }`}
                    >
                      {room.available}
                    </span>{" "}
                    <span className="text-gray-500">out of {room.totalRooms} rooms left</span>
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No rooms available</p>
          )}

          {/* FAQ */}
          <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">❓ FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow border border-gray-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-800 hover:text-indigo-600"
                  >
                    {faq.question}
                    <FiChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? "rotate-180 text-indigo-600" : ""}`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-4 text-gray-600 border-t border-gray-100">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Booking Panel */}
        <div className="lg:col-span-1 sticky top-20 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Book Your Stay</h2>
            <p className="text-gray-700">
              Starting from{" "}
              <span className="font-bold text-green-600">
                ₹{hotel.rooms?.[0]?.price?.toLocaleString() || 0}
              </span>{" "}
              / night
            </p>

            {Booking && (
              <div className="p-6 border rounded-2xl shadow-lg bg-gray-50 space-y-5">
                <h3 className="text-2xl font-bold text-center text-gray-800">Booking Form</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="requiredRooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Required Rooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="requiredRooms"
                      type="number"
                      min="1"
                      max="5"
                      placeholder="Enter number of rooms"
                      className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-400 focus:border-blue-500"
                      onChange={(e) =>
                        setRequiredRooms(
                          e.target.value > 5
                            ? toast.error("You can only book up to 5 rooms")
                            : e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-In <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring focus:ring-blue-400"
                      onChange={(e) => setBookingCheckIn(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                      Check-Out <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring focus:ring-blue-400"
                      onChange={(e) => setBookingCheckOut(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Room</label>
                    <input
                      type="text"
                      value={"₹" + (hotel.rooms?.[0]?.price?.toLocaleString() || 0)}
                      readOnly
                      className="w-full border rounded-lg px-3 py-2 bg-gray-100 font-semibold text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-400">
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>

                  <div className="p-3 bg-gray-100 rounded-lg text-center">
                    <span className="text-sm text-gray-600">Total Payable:</span>
                    <p className="text-lg font-bold text-gray-800">
                      {"₹" + ((Number(RequiredRooms) * hotel.rooms?.[0]?.price) || 0).toLocaleString()}
                    </p>
                  </div>

                  <PaymentIcons />
                  <button
                    type="button"
                    onClick={() => BookHotel(hotel._id)}
                    disabled={!RequiredRooms || !BookingCheckIn || !BookingCheckOut}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setBooking(false)}
                    className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
              onClick={() => setBooking((prev) => !prev)}
            >
              {Booking ? "Cancel Now" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      <Cooment />

      {/* Route Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-7xl mx-auto mt-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          📍 Route to <span className="text-indigo-600">{hotel.name}</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          From your current location to{" "}
          <span className="font-semibold text-gray-800">
            {hotel.location?.address}, {hotel.location?.city}, {hotel.location?.state}, {hotel.location?.country}
          </span>
        </p>

        <div className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <UserLivelocation
            NewLat={hotel.location?.latitude}
            NewLong={hotel.location?.longitude}
            NewHotelLocation={hotel.name}
          />
        </div>
      </div>
    </>
  );
}
