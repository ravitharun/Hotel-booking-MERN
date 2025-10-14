import React, { useRef, useState } from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
  FaRupeeSign,
  FaBuilding,
  FaHotel,
  FaBroom,
  FaInfoCircle,
} from "react-icons/fa";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaExclamationCircle,
} from "react-icons/fa";
import axios from "axios";

import UserLivelocation from "./Location/UserLivelocation";
import { FiHelpCircle, FiChevronDown } from "react-icons/fi";
import Cooment from "./Cooment";
import { email } from "../AUTH/Email";
import toast, { Toaster } from "react-hot-toast";
import PaymentIcons from "./PaymentIcons";
import Higher from "./HIGHERORDER/Higher";

function HotelDetails() {
  const { state } = useLocation();
  const Data = state?.Data || [];
  const hotel = Data[0] || Data;
  console.log(hotel,'hotel')
  const fallbackImages = [
    "https://tse4.mm.bing.net/th/id/OIP.eUmRjpZOz3-yqS_-wEwRPQHaE8?pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th/id/OIP.gZyEooH2Mxo8bl2tfxUjSAHaE8?pid=Api&P=0&h=180",
    "https://tse2.mm.bing.net/th/id/OIP.lF5VK1jCX1Jq0Im8ST1FFgHaE8?pid=Api&P=0&h=180",
    "https://tse4.mm.bing.net/th/id/OIP.lCI6O_uWZXMtnHydLbhVawHaFB?pid=Api&P=0&h=180",
  ];
  const hotelImages =
    hotel.images && hotel.images.length > 0 ? hotel.images : fallbackImages;

  // FAQ dropdown state
  const [openIndex, setOpenIndex] = useState(null);
  const [Booking, setBooking] = useState(false);
  const [IssueForm, setIssueForm] = useState(false);

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

  const [RequiredRooms, setRequiredRooms] = useState("");
  const [BookingCheckIn, setBookingCheckIn] = useState("");
  const [BookingCheckOut, setBookingCheckOut] = useState("");
  // booking the room function

  async function BookHotel(Hotelid, e) {
    e.preventDefault();

    const BookingData = {
      HotelBookingId: Hotelid,
      RequiredRooms: Number(RequiredRooms), // make sure this variable exists
      BookingCheckIn: BookingCheckIn,
      UserEmail: email,
      BookingCheckOut,
    };

    try {
      const getbookingStatus = await axios.get(
        "http://localhost:3000/Hotel/booking/HotelBooking",
        {
          params: {
            BookingData: BookingData,
          },
        }
      );

      if (
        getbookingStatus.data.message ===
        "Insufficient rooms available for your booking request."
      ) {
        return toast.error(getbookingStatus.data.message);
      }

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
                <p className="text-sm font-medium text-gray-900">
                  Booking Status
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {getbookingStatus.data.message}
                </p>
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
      setBooking(false);
    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
  }
  const ReviewName = useRef("");
  const ReviewEmail = useRef("");
  const ReviewType = useRef("");
  const ReviewMessage = useRef("");
  const SubmitIsssue = (OwnerEmail) => {
    console.log(OwnerEmail)
    if (
      ReviewMessage.current.value == "" ||
      ReviewName.current.value == "" ||
      ReviewEmail.current.value == ""
    ) {
      return alert("Fill the  required details in the form.",OwnerEmail);
    }
    const FormData = {
      ReviewName: ReviewName.current.value,
      ReviewEmail: ReviewEmail.current.value,
      ReviewMessage: ReviewMessage.current.value,
      OwnerEmail:OwnerEmail
    };
    console.log('FormData Issue ',FormData);
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder="false"></Toaster>

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
            {hotel.name || "Hotel Name "}
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
            <h2 className="text-2xl font-semibold mb-2">About this a hotel</h2>
            <p className="text-gray-700">
              {hotel.description || "No description available"}
            </p>
            {hotel.location && (
              <div className="mt-4 flex items-start gap-2 text-gray-600">
                <FaMapMarkerAlt className="mt-1 text-red-500" />
                <div>
                  <p>{hotel.location.address}</p>
                  <p>
                    {hotel.location.city}, {hotel.location.state},{" "}
                    {hotel.location.country} - {hotel.location.zipcode}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                    <FaInfoCircle
                      className="flex-shrink-0 text-blue-500"
                      size={15}
                    />
                    <span>
                      {hotel.location.distanceFromAirport} from airport,{" "}
                      {hotel.location.distanceFromRailwayStation} from railway
                      station
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Rooms */}
          {hotel.rooms?.length > 0 ? (
            hotel.rooms.map((room) => (
              <div
                key={room.roomId}
                className="bg-white p-6 rounded-2xl shadow space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{room.type}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    <span>{hotel.starCategory || 5}</span>
                  </div>
                </div>

                <p className="text-gray-600">{room.size}</p>

                {/* Room Images Horizontal Scroll */}
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
                    <span className="font-bold text-green-600">
                      {room.price.toLocaleString()}
                    </span>
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
                    <span className="text-gray-500">
                      out of {room.totalRooms} rooms left
                    </span>
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No rooms available</p>
          )}

          <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">❓ FAQ</h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow border border-gray-200"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-800 hover:text-indigo-600"
                  >
                    {faq.question}
                    <FiChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openIndex === index ? "rotate-180 text-indigo-600" : ""
                      }`}
                    />
                  </button>

                  {/* Answer */}
                  {openIndex === index && (
                    <div className="px-5 pb-4 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Panel */}
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
              <div className="p-6 border rounded-2xl shadow-lg max-w-lg mx-auto bg-gradient-to-br from-white to-gray-50">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Booking Form
                </h3>

                <form className="space-y-5">
                  {/* Required Rooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Rooms <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="requiredRooms"
                      required
                      min="1"
                      max="5"
                      onChange={(e) =>
                        setRequiredRooms(
                          e.target.value > 5
                            ? toast.error("You can only book up to 5 rooms")
                            : e.target.value
                        )
                      }
                      placeholder="Enter number of rooms"
                      className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-400 focus:border-blue-500"
                    />
                  </div>

                  {/* Check In */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-In <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      onChange={(e) => setBookingCheckIn(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring focus:ring-blue-400"
                    />
                  </div>

                  {/* Check Out */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-Out <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="checkout"
                      onChange={(e) => setBookingCheckOut(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring focus:ring-blue-400"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Room
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={
                        "₹" + hotel.rooms?.[0]?.price?.toLocaleString() || 0
                      }
                      readOnly
                      className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600 font-semibold"
                    />
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Status
                    </label>
                    <select
                      name="paymentStatus"
                      className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>

                  {/* Total Pay Amount */}
                  <div className="p-3 bg-gray-100 rounded-lg text-center">
                    <span className="text-sm text-gray-600">
                      Total Payable:
                    </span>
                    <p className="text-lg font-bold text-gray-800">
                      {"₹" +
                        (
                          Number(RequiredRooms) * hotel.rooms?.[0]?.price || 0
                        ).toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <PaymentIcons></PaymentIcons>
                  </div>
                  {/* Buttons */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      onClick={() => BookHotel(hotel._id, event)}
                      disabled={!RequiredRooms}
                      // disabled={!RequiredRooms && !checkOut && !checkIn }
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setBooking((prev) => !prev)}
                      className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <button
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
              onClick={() => setBooking((prev) => !prev)}
            >
              {Booking ? "Cancel Now" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
      {/* ( */}
      <div className="flex flex-col items-center justify-center mt-10 bg-white min-h-screen text-gray-800">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <FaInfoCircle size={24} className="text-gray-600" />
          <h2 className="text-2xl font-semibold">Hotel Review / Issue Form</h2>
        </div>

        {/* Form */}
        {IssueForm ? (
          <form className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
            {/* Name */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <FaUser className="text-gray-600" />
              <input
                type="text"
                placeholder="Your Name"
                ref={ReviewName}
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-600" />
              <input
                type="email"
                placeholder="Your Email"
                ref={ReviewEmail}
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Type */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" className="accent-gray-700" />
                <FaHotel className="text-gray-600" required /> Review
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" className="accent-gray-700" />
                <FaExclamationCircle className="text-gray-600" required /> Issue
              </label>
            </div>

            {/* Message */}
            <div className="flex items-start gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <FaCommentDots className="mt-1 text-gray-600" />
              <textarea
                placeholder="Write your message here..."
                rows={4}
                ref={ReviewMessage}
                className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={()=>SubmitIsssue(hotel.owner.email)}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
            >
              <FaPaperPlane />
              Submit
            </button>
          </form>
        ) : null}
        <button
          type="button"
          onClick={() => setIssueForm((prev) => !prev)}
          className="flex items-center justify-center gap-2 bg-gray-800 mt-10 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105"
        >
          {IssueForm ? (
            <>
              {/* <FaClose /> */}
              close review
            </>
          ) : (
            "Open"
          )}{" "}
        </button>

        {/* Message */}
        <p className="mt-5 text-center max-w-sm text-gray-600 italic">
          Share your experience or report an issue — we value your feedback! 🌟
        </p>
      </div>

      <br />
      <br />
      <br />

      <Cooment></Cooment>
      {/* Route Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-7xl mx-auto mt-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
          📍 Route to <span className="text-indigo-600">{hotel.name}</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base lg:text-lg">
          From your current location to{" "}
          <span className="font-semibold text-gray-800">
            {hotel.location?.address}, {hotel.location?.city},{" "}
            {hotel.location?.state}, {hotel.location?.country}
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
const NewFeature = Higher(HotelDetails, false);
export default function HotelInfo() {
  return (
    <>
      <NewFeature age="10" loder page="DetailsPage" />
    </>
  );
}
