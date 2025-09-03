import React from "react";

const bookingData = [
  {
    hotel: "Grand Palace Hotel",
    checkIn: "2024-06-10",
    checkOut: "2024-06-15",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    hotel: "Modern City Inn",
    checkIn: "2025-02-12",
    checkOut: "2025-02-15",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    hotel: "Sunset Beach Resort",
    checkIn: "2023-12-01",
    checkOut: "2023-12-05",
    status: "Cancelled",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a8963?auto=format&fit=crop&w=400&q=80",
  }
];

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Upcoming: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function BookingHistory() {
  return (
    <>
    <div className="max-w-2xl mx-auto my-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Booking History</h3>
      <div className="space-y-6">
        {bookingData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-6 border border-gray-100 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.hotel}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{item.hotel}</h4>
              <div className="text-gray-500 mt-2 text-sm">
                <span>Check-in: {item.checkIn}</span>
                <br />
                <span>Check-out: {item.checkOut}</span>
              </div>
              <span
                className={`inline-block mt-3 px-3 py-1 rounded text-xs font-semibold ${statusColors[item.status]}`}
              >
                {item.status}
              </span>
            </div>
            <button className="mt-4 md:mt-0 px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    </>

  );
}
