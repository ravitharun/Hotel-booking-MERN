import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaUser,
  FaCalendarAlt,
  FaClosedCaptioning,
  FaTimesCircle,
  FaChevronUp,
  FaChevronDown,
  FaInfo,
} from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import Navbar from "../Navbar";
import Footer from "../User/Footer";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import MyBookings from "./MyBookings";
import FAQ from "./FAQ";

export default function HotelBooking() {
  const [destination, setDestination] = useState("Mumbai");
  const [children, setChildren] = useState(2);
  const [adults, setAdults] = useState(2);
  const [checkIn, setCheckIn] = useState(Date.now());
  const [checkOut, setCheckOut] = useState("");
  const [DropDown, SetDropDown] = useState(true);
  const [ErrorMsg, SetErrormsg] = useState(false);
  // popularDestination array of Object stored Dynamically Stored
  const popularDestinations = [
    {
      id: 1,
      name: "Goa, India",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.DRPRiumpHAyoSWdeKjKt1AHaEK?pid=Api&P=0&h=180",
    },
    {
      id: 2,
      name: "Jaipur, Rajasthan",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.aTSk_4pw2fbV4bfrwNJi1QHaEK?pid=Api&P=0&h=180",
    },
    {
      id: 3,
      name: "Manali, Himachal Pradesh",
      image:
        "https://i.pinimg.com/originals/97/90/4d/97904d2d15fc91ea7a663d44c6cc550c.jpg",
    },
    {
      id: 4,
      name: "Kerala (Munnar)",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.U1W9QLqViaohRXvD2BTe0AHaEl?pid=Api&P=0&h=180",
    },
    {
      id: 5,
      name: "Agra, Uttar Pradesh",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.a9bwszxDhyTPK23plf5D4wHaHa?pid=Api&P=0&h=180",
    },

    {
      id: 6,
      name: "Hyderabad, Telangana",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.tbbpuhmcQ5logqiw2U2WKAHaE8?pid=Api&P=0&h=180",
    },
    {
      id: 7,
      name: "Chennai, Tamil Nadu",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.4tQ32alpGwj6FADI07UKlAHaE8?pid=Api&P=0&h=180",
    },
    {
      id: 8,
      name: "Kasi (Varanasi), Uttar Pradesh",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.B0iLyEkjkiqaLISv8x3ETAHaE8?pid=Api&P=0&h=180",
    },
    {
      id: 9,
      name: "Bengaluru, Karnataka",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.EhFJGe49j9WNcBaVhdLtzQHaEK?pid=Api&P=0&h=180",
    },
  ];

  const currentDate = new Date();
  // Convert to YYYY-MM-DD format
  const trimmedDate = currentDate.toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  const trimmedTomorrow = tomorrow.toISOString().split("T")[0];
  // console.log("Tomorrow:", trimmedTomorrow);
  const navigate = useNavigate("");
  const Search = () => {
    const data = {
      destination: destination,
      children: children,
      adults: adults,
      checkIn: checkIn,
      checkOut: checkOut,
    };
    if (data.checkOut == "") {
      SetErrormsg(true);
      return setTimeout(() => {
        SetErrormsg("");
        SetErrormsg(true);
      }, 1500);
    }
    console.log("hotel data  user input value", data);
    navigate(`/Search/Location`, {
      state: {
        data,
      },
    });
  };
  return (
    <>
      <Navbar />

      <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h3 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            Find Your Perfect Stay
          </h3>
          <p className="text-lg text-gray-600">
            Luxury hotels, budget rooms, and unique stays across India
          </p>
        </div>

        {/* Booking Section (Form + Image in ONE card) */}
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden  mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Booking Form */}
            <div className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Book Your Stay
              </h3>

              {/* Destination */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Destination
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    id="typewriter"
                    placeholder="Search Your Love Place ..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="flex-1 outline-none"
                  />
                  <h4></h4>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-2">
                    Check-In
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="flex-1 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-2">
                    Check-Out
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="flex-1 outline-none"
                    />
                  </div>
                  {ErrorMsg && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-red-500 font-mono">
                      <FaInfo className="text-red-500" />
                      <span>Required these * </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium  mb-2 flex items-center gap-2 cursor-pointer text-orange-500 hover:text-gray-600"
                  title="Select number of guests"
                  onClick={() => SetDropDown(!DropDown)}
                >
                  Number of Guests{" "}
                  {DropDown ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </label>
                {DropDown && (
                  <>
                    <DropdownCounter
                      label="Adults"
                      value={adults}
                      setValue={setAdults}
                      icon={<FaUser />}
                    />
                    <DropdownCounter
                      label="Children"
                      value={children}
                      setValue={setChildren}
                      icon={<FaUserFriends />}
                    />
                  </>
                )}
              </div>

              {/* Search Button} */}
              <button
                className={`w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition  ${
                  !checkOut ? "cursor-not-allowed bg-red-400" : "cursor-pointer"
                }`}
                // style={{}}
                disabled={!checkOut}
                onClick={Search}
              >
                Search Hotels
              </button>
            </div>

            {/* Image Showcase */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Hotel"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-semibold text-white">
                  Experience Luxury
                </h3>
                <p className="text-gray-200 text-sm mt-1">
                  Discover breathtaking views, world-class hospitality, and a
                  memorable stay with us.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Year Displaying */}
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icon */}
          <div className="p-4 bg-blue-100 rounded-2xl flex items-center justify-center">
            <FaCalendarAlt className="w-10 h-10 text-blue-600" />
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Find your perfect stay faster
            </h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Searching for{" "}
              <span className="font-medium text-blue-600">{trimmedDate}</span> –{" "}
              <span className="font-medium text-blue-600">
                {trimmedTomorrow}
              </span>
            </p>
          </div>
        </div>

        <br />
        {/* Top Visiting Location Places */}
        <div className="flex flex-wrap gap-6 justify-center">
          <h3 className="text-gray-600 font-mono text-lg w-full text-center mb-4">
            Top Visiting Location Places
          </h3>
          {popularDestinations.map((data, index) => (
            <button
              key={index}
              className="flex flex-col items-center text-center group"
              title={data.name}
            >
              {/* Circle Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Below */}
              <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-blue-600 transition-all duration-300">
                {data.name}
              </span>
            </button>
          ))}
        </div>

        <br />
        <br />

        {/* Your recent searches by user */}
        <div className="flex flex-col gap-3 ml-44 mt-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Your recent searches
          </h2>
          <div className="flex flex-wrap gap-3">
            {["Goa, India", "Jaipur, Rajasthan"].map((data, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full shadow-md bg-white hover:shadow-md transition  hover:border-amber-950 cursor-pointer"
              >
                <span className="text-gray-700 text-sm font-medium hover:text-amber-950 ">
                  {data}
                </span>
                <FaTimesCircle className="text-gray-400 hover:text-red-500 cursor-pointer transition" />
              </div>
            ))}
          </div>
        </div>

        <br />
        <br />

        {/* Search Place by Location we will display in the ui*/}

        <div>
          Search Place by Location we will display in the ui (like hotel in
          india)
        </div>
      </div>
      <FAQ></FAQ>
      <Footer />
    </>
  );
}

/* Reusable Counter Component */
function DropdownCounter({ label, value, setValue, icon }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-700 font-medium flex items-center gap-2">
        {icon} {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          className="p-1 border rounded-full hover:bg-gray-100 disabled:opacity-40"
          onClick={() => setValue(Math.max(0, value - 1))}
          disabled={value === 0}
        >
          <AiOutlineMinus />
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          className="p-1 border rounded-full hover:bg-gray-100"
          onClick={() => setValue(value + 1)}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
