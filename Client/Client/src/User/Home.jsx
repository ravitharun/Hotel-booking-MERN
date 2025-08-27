import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../User/Footer";
import { MdOutlineMeetingRoom } from "react-icons/md";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import { FaUserFriends } from "react-icons/fa";

export default function HotelBooking() {
  const [destination, setDestination] = useState("");
  // const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [Children, setChildren] = useState(1);
  const [Adults, setAdults] = useState(1);
  const [DropdownOpen, setDropdownOpen] = useState(true);
  const [Disable, setdisable] = useState(false);

  const featuredHotels = [
    {
      id: 1,
      name: "The Oberoi Amarvilas",
      location: "Agra, India",
      price: "₹25,000/night",
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Taj Lake Palace",
      location: "Udaipur, India",
      price: "₹30,000/night",
      image:
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "ITC Grand Chola",
      location: "Chennai, India",
      price: "₹18,000/night",
      image:
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className=" mt-20 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg text-gray-600">
            Luxury hotels, budget rooms, and unique stays across India
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl p-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mb-16">
          {/* Destination */}
          <div className="flex flex-col flex-[2] min-w-[220px]">
            <label className="text-sm font-medium text-blue-600 mb-1">
              Destination
            </label>
            <div className="flex items-center gap-2  border-blue-600 border-1 rounded-xl px-4 py-3">
              <FaMapMarkerAlt className="text-blue-600 text-lg" />
              <input
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="outline-none w-full bg-transparent "
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="flex flex-col flex-1 min-w-[160px]">
            <label className="text-sm font-medium text-green-600 mb-1">
              Check-in
            </label>
            <div className="flex items-center gap-2 border-green-600 border-1 rounded-xl px-4 py-3">
              <FaCalendarAlt className="text-blue-600 text-lg" />
              <input
                type="date"
                className="outline-none w-full bg-transparent"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex flex-col flex-1 min-w-[160px]">
            <label className="text-sm font-medium text-red-600 mb-1">
              Check-out
            </label>
            <div className="flex items-center gap-2 border-red-600 border-1 rounded-xl px-4 py-3">
              <FaCalendarAlt className="text-blue-600 text-lg" />
              <input
                type="date"
                className="outline-none w-full bg-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col flex-1 min-w-[220px]">
            {/* Label */}
            <label className="text-sm font-medium text-gray-600 mb-1">
              Guests & Rooms
            </label>

            {/* Closed Dropdown */}

            <div
              className="flex items-center justify-between gap-2 border-orange-500 border-1 rounded-xl px-4 py-3 cursor-pointer bg-white shadow-sm "
              onClick={() => setDropdownOpen(!DropdownOpen)}
            >
              <div className="flex items-center gap-2">
                <FaUserFriends className="text-blue-600 text-lg" />
                <p className="text-gray-700 text-sm hover:text-orange-500">
                  Adults: {Adults} · Children: {Children} · Rooms: {guests}
                </p>
              </div>
            </div>

            {/* Open Dropdown UI (static, just design) */}
            {DropdownOpen && (
              <div className="mt-2 bg-white border rounded-xl shadow-md p-4 space-y-4">
                {/* Adults */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex space-x-3">
                    <FaUser></FaUser>Adults
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-1 border rounded-full hover:bg-gray-100">
                      <AiOutlineMinus
                        onClick={() =>
                          Adults == 0 ? setdisable(true) : setAdults(Adults - 1)
                        }
                      />
                    </button>
                    <span className="w-6 text-center">{Adults}</span>
                    <button className="p-1 border rounded-full hover:bg-gray-100">
                      <AiOutlinePlus
                        onClick={() =>
                          Adults == 0 ? setdisable(true) : setAdults(Adults - 1)
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex">
                    {" "}
                    <FaUser></FaUser> Children
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-1 border rounded-full hover:bg-gray-100">
                      <AiOutlineMinus
                        onClick={() =>
                          Children == 0
                            ? setdisable(true)
                            : setChildren(Children - 1)
                        }
                      />
                    </button>
                    <span className="w-6 text-center">{Children}</span>
                    <button className="p-1 border rounded-full hover:bg-gray-100">
                      <AiOutlinePlus
                        onClick={() =>
                          Children == 0
                            ? setdisable(true)
                            : setChildren(Children + 1)
                        }
                      />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex">
                    <MdOutlineMeetingRoom fontSize={20}></MdOutlineMeetingRoom>
                    Rooms
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 border rounded-full hover:bg-gray-100"
                      disabled={Disable}
                    >
                      <AiOutlineMinus
                        onClick={() =>
                          guests == 0 ? setdisable(true) : setGuests(guests - 1)
                        }
                      />
                    </button>
                    <span className="w-6 text-center">{guests}</span>
                    <button className="p-1 border rounded-full hover:bg-gray-100">
                      <AiOutlinePlus onClick={() => setGuests(guests + 1)} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Rooms */}

          {/* Search Button */}
          <div className="flex items-end">
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl shadow-md font-medium w-full">
              🔍 Search
            </button>
          </div>
        </div>

        {/* Featured Hotels */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Featured Hotels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                  <p className="text-blue-600 font-bold">{hotel.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
