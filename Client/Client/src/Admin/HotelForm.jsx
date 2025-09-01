import React, { useState } from "react";

const HotelForm = () => {
  const [hotel, setHotel] = useState({
    id: 51,
    name: "Lakeview Serenity Resort",
    chain: "Serenity Group",
    description: "Tranquil lakeside resort in Nainital with boating and mountain views.",
    starCategory: 4,
    location: {
      address: "Mallital, Nainital",
      city: "Nainital",
      state: "Uttarakhand",
      country: "India",
      zipcode: "263001",
      latitude: 29.3922,
      longitude: 79.4542,
      distanceFromAirport: "60 km",
      distanceFromRailwayStation: "35 km",
    },
    owner: {
      name: "Priya Joshi",
      email: "owner.nainital@serenity.com",
    },
    rating: 4.5,
    reviewsCount: 520,
    remainingRooms: 8,
    rooms: [
      {
        roomId: 51010,
        type: "Lake View Suite",
        capacity: 2,
        bedType: "King",
        size: "420 sq ft",
        price: 9200,
        totalRooms: 10,
        available: 8,
        facilities: ["AC", "Lake View", "Boating Access"],
        images: [
          "https://source.unsplash.com/400x300/?nainital,hotel",
          "https://source.unsplash.com/400x300/?lake,room",
        ],
      },
    ],
    bookings: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hotel Form</h2>

      {/* Basic Details */}
      <label className="block mb-2">Hotel Name</label>
      <input
        type="text"
        name="name"
        value={hotel.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Chain</label>
      <input
        type="text"
        name="chain"
        value={hotel.chain}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        value={hotel.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Star Category</label>
      <input
        type="number"
        name="starCategory"
        value={hotel.starCategory}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Location */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Location</h3>
      {Object.keys(hotel.location).map((key) => (
        <div key={key}>
          <label className="block mb-2 capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={hotel.location[key]}
            onChange={(e) =>
              setHotel((prev) => ({
                ...prev,
                location: { ...prev.location, [key]: e.target.value },
              }))
            }
            className="w-full p-2 border rounded mb-4"
          />
        </div>
      ))}

      {/* Owner */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Owner</h3>
      <label className="block mb-2">Name</label>
      <input
        type="text"
        value={hotel.owner.name}
        onChange={(e) =>
          setHotel((prev) => ({
            ...prev,
            owner: { ...prev.owner, name: e.target.value },
          }))
        }
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Email</label>
      <input
        type="email"
        value={hotel.owner.email}
        onChange={(e) =>
          setHotel((prev) => ({
            ...prev,
            owner: { ...prev.owner, email: e.target.value },
          }))
        }
        className="w-full p-2 border rounded mb-4"
      />

      {/* Rooms */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Rooms</h3>
      {hotel.rooms.map((room, i) => (
        <div key={i} className="p-4 border rounded mb-4">
          <label className="block mb-2">Room Type</label>
          <input
            type="text"
            value={room.type}
            onChange={(e) => {
              const newRooms = [...hotel.rooms];
              newRooms[i].type = e.target.value;
              setHotel((prev) => ({ ...prev, rooms: newRooms }));
            }}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={room.price}
            onChange={(e) => {
              const newRooms = [...hotel.rooms];
              newRooms[i].price = e.target.value;
              setHotel((prev) => ({ ...prev, rooms: newRooms }));
            }}
            className="w-full p-2 border rounded mb-4"
          />
        </div>
      ))}
    </div>
  );
};

export default HotelForm;
