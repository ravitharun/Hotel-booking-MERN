import React, { useState } from "react";
import Navbar from "../Navbar";
import Form from "./Form";
import { FaWifi, FaSwimmer, FaParking, FaCoffee } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import NetWorkCheck from "../NetWorkCheck";
export default function SearchHotelPage() {
  const hotels = [
    {
      name: "Grand Palace Hotel",
      location: "New York",
      image: "https://source.unsplash.com/400x300/?hotel,room",
      price: "$250/night",
      rating: 4.5,
      badge: "Best Seller",
      amenities: ["wifi", "pool", "parking", "breakfast"],
      distance: "0.5 km from center",
    },
    {
      name: "Sea View Resort",
      location: "California",
      image: "https://source.unsplash.com/400x300/?resort,beach",
      price: "$180/night",
      rating: 4.0,
      badge: "Popular",
      amenities: ["wifi", "pool", "breakfast"],
      distance: "1 km from beach",
    },
    {
      name: "Mountain Retreat",
      location: "Colorado",
      image: "https://source.unsplash.com/400x300/?mountain,hotel",
      price: "$200/night",
      rating: 4.2,
      badge: "Luxury",
      amenities: ["wifi", "parking", "breakfast"],
      distance: "2 km from city",
    },
    // ...rest hotels
  ];

  useEffect(() => {
    const serachHotel = async () => {
      try {
        const getHotel = await axios.get("http://localhost:3000/Hotel/all");
        console.log(getHotel);
      } catch (error) {
        console.log(error.message);
      }
    };
    serachHotel();
  }, []);

  const [filteredHotels, setFilteredHotels] = useState(hotels);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Top Search Form */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Form />
      </div>
<NetWorkCheck></NetWorkCheck>
      {/* Main Content: Left Filters / Right Hotels */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* Left Filters */}
        <div className="lg:w-1/4 bg-white rounded-3xl shadow-lg p-6 space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-bold mb-2">Filters</h2>
          <p className="text-gray-500 text-base">
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

          {/* Amenities Example */}
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
            <label className="text-base font-medium text-gray-700 block mb-2">
              Amenities
            </label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  name="amenities"
                  className="accent-blue-600"
                />
                Free Wi-Fi
              </label>
              <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  name="amenities"
                  className="accent-blue-600"
                />
                Swimming Pool
              </label>
              <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  name="amenities"
                  className="accent-blue-600"
                />
                Parking
              </label>
              <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  name="amenities"
                  className="accent-blue-600"
                />
                Gym
              </label>
              <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  name="amenities"
                  className="accent-blue-600"
                />
                Garden
              </label>
              <label className="flex items-center gap-2 text-gray-600 p-2 rounded-md hover:bg-gray-50 transition">
                <input
                  type="checkbox"
                  name="amenities"
                  className="accent-blue-600"
                />
                Conference Room
              </label>
            </div>
          </div>
        </div>

        {/* Right Hotels */}
        <div className="lg:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition relative"
            >
              {/* Badge */}
              {hotel.badge && (
                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {hotel.badge}
                </span>
              )}

              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{hotel.name}</h3>
                <p className="text-gray-500">{hotel.location}</p>
                <p className="text-yellow-500 mt-1">⭐ {hotel.rating}</p>
                <p className="text-blue-600 font-bold mt-2">{hotel.price}</p>

                {/* Amenities */}
                <div className="flex flex-wrap mt-2">
                  {hotel.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center text-sm mr-4">
                      {getAmenityIcon(amenity)}
                      <span className="text-gray-600">
                        {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mt-1">{hotel.distance}</p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
