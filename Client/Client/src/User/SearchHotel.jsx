import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar";
import {
  FaWifi,
  FaSwimmer,
  FaParking,
  FaCoffee,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import axios from "axios";
import NetWorkCheck from "../NetWorkCheck";
import UserLivelocation from "./Location/UserLivelocation";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchHotelPage() {
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [active, setActive] = useState("grid"); // list or grid
  const [searchError, setSearcherror] = useState(""); // list or grid
  const HotelSearchData = useLocation();
  const [Dropdown, setDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const Destination = useRef("");
  const checkOut = useRef("");
  const checkIn = useRef("");
  useEffect(() => {
    const serachHotel = async () => {
      try {
        const getHotel = await axios.get("http://localhost:3000/Hotel/all");
        setFilteredHotels(getHotel.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    serachHotel();
  }, []);

  const redirect = useNavigate("");
  // GetHotelInfo
  const gethotelInfo = async (HotelId) => {
    const HotelIDData = await axios.get(
      "http://localhost:3000/Hotel/GetHotelId",
      {
        params: {
          HotelId: HotelId,
        },
      }
    );
    const Data = HotelIDData.data.message;
    redirect("/Search/Location", {
      state: {
        Data,
      },
    });
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <FaWifi title="Wi-Fi" className="text-gray-500 mr-2" />;
      case "pool":
        return <FaSwimmer title="Pool" className="text-gray-500 mr-2" />;
      case "parking":
        return <FaParking title="Parking" className="text-gray-500 mr-2" />;
      case "breakfast":
        return <FaCoffee title="Breakfast" className="text-gray-500 mr-2" />;
      default:
        return null;
    }
  };

  // search feature

  const serachHotel = async () => {
    const Data = {
      Destination: Destination.current.value,
    };

    const GetHotelLocationdata = await axios.get(
      "http://localhost:3000/Hotel/hotels/location/search",
      {
        params: {
          HotelLocation: Data.Destination,
        },
      }
    );
    console.log(GetHotelLocationdata.data.message, "GetHotelLocationdata");
    if (
      GetHotelLocationdata.data.message == GetHotelLocationdata.data.message
    ) {
      return setSearcherror(GetHotelLocationdata.data.message, "error msg");
    }
     setSearcherror(GetHotelLocationdata.data.message);
    location.reload();
  };


  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Top Search Form */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mt-16 p-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Destination */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Destination
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <input
                  type="text"
                  ref={Destination}
                  placeholder="Search your favorite place..."
                  className="flex-1 outline-none"
                />
              </div>
            </div>

            {/* Check-In */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Check-In
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <input
                  type="date"
                  className="flex-1 outline-none"
                  ref={checkIn}
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Check-Out
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <input
                  type="date"
                  className="flex-1 outline-none"
                  ref={checkOut}
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1 flex flex-col relative">
              <label
                className="text-sm font-medium text-gray-600 mb-1 flex items-center justify-between cursor-pointer"
                onClick={() => setDropdown(!Dropdown)}
              >
                Guests
              </label>

              <div
                className="flex items-center justify-between border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
                onClick={() => setDropdown(!Dropdown)}
              >
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  <span>
                    {adults} Adults, {children} Children
                  </span>
                </div>
                {Dropdown ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>

              {Dropdown && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg p-4 space-y-3 z-10">
                  {/* Adults */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-500" />
                      <span>Adults</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setAdults(adults + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaUserFriends className="text-gray-500" />
                      <span>Children</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          setChildren(children > 0 ? children - 1 : 0)
                        }
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setChildren(children + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-400 hover:cursor-pointer transition whitespace-nowrap"
              onClick={serachHotel}
            >
              Search Hotels
            </button>
          </div>
        </div>
      </div>
      <NetWorkCheck />

      {/* List/Grid Toggle */}
      <div className="flex justify-end mb-6 gap-2 px-4">
        <button
          className={`px-4 py-2 rounded-full font-medium transition ${
            active === "list"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActive("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium transition ${
            active === "grid"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActive("grid")}
        >
          Grid
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* User Live Location Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📍 Your Current Location
          </h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <UserLivelocation />
          </div>
        </div>

        {/* Filters + Hotels */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Filters */}
          <div className="lg:w-1/4 bg-white rounded-3xl shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-2">Filters</h2>
            <p className="text-gray-500 text-base mb-4">
              Refine your search to find the best hotels for you
            </p>

            {/* Price Range */}
            <div>
              <label className="text-base font-medium text-gray-700 block mb-1">
                Price Range
              </label>
              <input
                type="range"
                min="10000"
                max="500000"
                className="w-full mt-2 accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>10000</span>
                <span>500000</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="text-base font-medium text-gray-700 block mb-1">
                Minimum Rating
              </label>
              <select className="w-full mt-2 border border-gray-300 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">All Ratings</option>
                <option value="3">3 Stars & Up</option>
                <option value="4">4 Stars & Up</option>
                <option value="4.5">4.5 Stars & Up</option>
              </select>
            </div>

            {/* Location */}
            <div className="w-full">
              <label
                htmlFor="location"
                className="text-base font-medium text-gray-700 block mb-2"
              >
                Location by state
              </label>
              <input
                list="locations"
                id="location"
                placeholder="Type or select..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="locations">
                <option value="New York" />
                <option value="California" />
                <option value="Colorado" />
                <option value="Florida" />
              </datalist>
            </div>

            {/* Bed Preference */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
              <label className="text-base font-medium text-gray-700 block mb-2">
                Bed Preference
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    name="BedType"
                    className="accent-blue-600"
                  />
                  King
                </label>
                <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    name="BedType"
                    className="accent-blue-600"
                  />
                  Queen
                </label>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
              <label className="text-base font-medium text-gray-700 block mb-2">
                Amenities
              </label>
              <div className="flex flex-col gap-3">
                {[
                  "Free Wi-Fi",
                  "Swimming Pool",
                  "Parking",
                  "Gym",
                  "Garden",
                  "Conference Room",
                ].map((amenity, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      name="amenities"
                      className="accent-blue-600"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hotels */}
          {searchError && (
            <span className="text-red-500 font-mono">{searchError}</span>
          )}
          <div className="lg:flex-1">
            {active === "list" ? (
              <div className="space-y-6">
                {filteredHotels.map((hotel, idx) => (
                  <div
                    key={idx}
                    onClick={() => gethotelInfo(hotel._id)}
                    className="bg-white rounded-xl shadow-md flex overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src="https://up.yimg.com/ib/th/id/OIP.SwkabKtuIqwGJNrf64wYPQHaD6?pid=Api&rs=1&c=1&qlt=95&w=231&h=122"
                      alt={hotel.name}
                      className="w-48 h-48 object-cover cursor-pointer"
                    />
                    <div className="p-4 flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {hotel.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {hotel.description}
                      </p>
                      <p className="text-gray-700 font-medium">
                        ⭐ {hotel.rating} | Rooms Left: {hotel.remainingRooms}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {hotel.amenities?.map((amenity, i) => (
                          <span key={i}>{getAmenityIcon(amenity)}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-500 transition hover:cursor-pointer"
                          onClick={() => gethotelInfo(hotel._id)}
                        >
                          View Details
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-500 transition hover:cursor-pointer">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map((hotel, idx) => (
                  <div
                    key={idx}
                    onClick={() => gethotelInfo(hotel._id)}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src="https://up.yimg.com/ib/th/id/OIP.cKXHMEuuqb0d-dCQV6FoDgHaE8?pid=Api&rs=1&c=1&qlt=95&w=166&h=110"
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {hotel.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {hotel.description}
                      </p>
                      <p className="text-gray-700 font-medium">
                        ⭐ {hotel.rating} | Rooms Left: {hotel.remainingRooms}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {hotel.amenities?.map((amenity, i) => (
                          <span key={i}>{getAmenityIcon(amenity)}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-500 transition hover:cursor-pointer"
                          onClick={() => gethotelInfo(hotel._id)}
                        >
                          View Details
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-500 transition hover:cursor-pointer">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
