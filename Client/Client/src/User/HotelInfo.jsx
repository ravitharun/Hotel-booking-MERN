import React from "react";
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
import UserLivelocation from "./Location/UserLivelocation";

export default function HotelInfo() {
  const { state } = useLocation();
  const Data = state?.Data || [];
  const hotel = Data[0] || {};
  console.log(hotel, "hotelhotelhotel");

  const fallbackImages = [
    "https://source.unsplash.com/600x400/?hotel,1",
    "https://source.unsplash.com/600x400/?hotel,2",
    "https://source.unsplash.com/600x400/?hotel,3",
    "https://source.unsplash.com/600x400/?hotel,4",
    "https://source.unsplash.com/600x400/?hotel,5",
  ];
  console.log(hotel.location?.latitude, "hotel.location?.latitude");
  console.log(hotel.location?.longitude, "hotel.location?.longitude");
  const hotelImages =
    hotel.images && hotel.images.length > 0 ? hotel.images : fallbackImages;

  return (
    <>
      <Navbar />

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
                  <p className="text-sm text-gray-400 mt-1">
                    {hotel.location.distanceFromAirport} from airport,{" "}
                    {hotel.location.distanceFromRailwayStation} from railway
                    station
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

                <p className="text-sm text-gray-500 mt-2">
                  {room.available} out of {room.totalRooms} rooms left
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No rooms available</p>
          )}
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
            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
  📍 Route to{" "}
  <span className="text-indigo-600">
    {hotel.name}
  </span>
</h2>
<p className="text-gray-600 text-sm md:text-base lg:text-lg">
  From your current location to{" "}
  <span className="font-semibold text-gray-800">
    {hotel.location.address}, {hotel.location.city}, {hotel.location.state}, {hotel.location.country}
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
