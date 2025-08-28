import { useEffect, useState } from "react";
import Navbar from "../Navbar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  // later: fetch bookings from backend using logged-in userId
  useEffect(() => {
    setBookings([
      {
        id: "B12345",
        hotel: "The Leela Palace",
        location: "Bangalore, India",
        checkIn: "2025-09-01",
        checkOut: "2025-09-05",
        guests: 2,
        status: "Confirmed",
        image: "https://source.unsplash.com/400x250/?hotel,room",
      },
    ]);
  }, []);

  return (
    <>
        <Navbar></Navbar>

    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="mb-4">You don’t have any bookings yet.</p>
          <a
            href="/hotels"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Explore Hotels
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl shadow-sm bg-white overflow-hidden"
            >
              <img
                src={b.image}
                alt={b.hotel}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{b.hotel}</h3>
                <p className="text-gray-500 text-sm">{b.location}</p>
                <p className="mt-2 text-sm">
                  <span className="font-medium">Check-in:</span> {b.checkIn} <br />
                  <span className="font-medium">Check-out:</span> {b.checkOut}
                </p>
                <p className="text-sm mt-1">Guests: {b.guests}</p>
                <p
                  className={`mt-2 text-sm font-semibold ${
                    b.status === "Confirmed"
                      ? "text-green-600"
                      : b.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {b.status}
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    View Details
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>

  );
}
