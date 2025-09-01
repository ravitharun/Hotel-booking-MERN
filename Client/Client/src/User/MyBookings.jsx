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
        image: "https://source.unsplash.com/400x250/?luxury,hotel",
      },
      {
        id: "B12346",
        hotel: "Taj Hotel",
        location: "Mumbai, India",
        checkIn: "2025-10-10",
        checkOut: "2025-10-12",
        guests: 3,
        status: "Pending",
        image: "https://source.unsplash.com/400x250/?hotel,room",
      },
    ]);
  }, []);

  return (
    <>
     

      <div className="p-6">
        <h2 className="text-2xl font-stretch-75% mb-4">My Total Bookings <span className="text-gray-500 font-thin"> ({bookings.length})</span></h2>

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={b.image}
                  alt={b.hotel}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-base truncate">
                    {b.hotel}
                  </h3>
                  <p className="text-gray-500 text-xs">{b.location}</p>

                  <div className="mt-2 text-xs text-gray-600">
                    <p>
                      <span className="font-medium">Check-in:</span> {b.checkIn}
                    </p>
                    <p>
                      <span className="font-medium">Check-out:</span>{" "}
                      {b.checkOut}
                    </p>
                    <p>Guests: {b.guests}</p>
                  </div>

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
                    <button className="flex-1 px-2 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      View
                    </button>
                    <button className="flex-1 px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <HotelForm></HotelForm>
    </>
  );
}
