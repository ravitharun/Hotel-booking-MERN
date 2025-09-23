import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import axios from "axios";
import { email, Role } from "../AUTH/Email";
import { useNavigate } from "react-router-dom";
import USerLoader from "./Loader/USerLoader";
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    const Bookingresponse = async () => {
      try {
        setisloading(true)
        const GetBooking = await axios.get(
          "http://localhost:3000/Hotel/UserBookingShow",
          {
            params: { Email: email },
          }
        );

        setBookings(GetBooking.data.message); // ✅ fixed
      } catch (err) {
        console.log(err.message);
      }
      finally{
        setisloading(false);
      }
    };
    Bookingresponse();
  }, []);
// get more about the hotel


const redirect=useNavigate('')
const gethotelInfo = async (HotelId) => {
    const HotelIDData = await axios.get(
      "http://localhost:3000/Hotel/GetHotelId",
      {
        params: {
          HotelId: HotelId,
        },
      }
    );
    console.log(HotelIDData.data.message);
    const Data = HotelIDData.data.message
    redirect("/Search/Location", {
      state: {
     Data
      },
    });
  };
  
  return (
    <>
      <Navbar />

{isloading ? <USerLoader isloading={isloading} role={Role}/> :
<>
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          🛎 My Hotel Bookings{" "}
          <span className="text-gray-500 text-lg font-normal">
            ({bookings.length})
          </span>
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="mb-4">You don’t have any bookings yet.</p>
            <a
              href="/hotels"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 shadow-md"
            >
              Explore Hotels
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b._id} // ✅ use backend _id
                onClick={()=>gethotelInfo(b._id)}  
                className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
              >
                {/* Left: Hotel Image */}
                <div className="sm:w-1/3 relative">
                  <img
                    src='https://tse3.mm.bing.net/th/id/OIP.Lmb3UGTfq_lC45wDdiCwxAHaEK?pid=Api&P=0&h=180'
                    alt={b.hotel || "Hotel"}
                    className="h-48 sm:h-full w-full object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === "Confirmed"
                        ? "bg-green-500 text-white"
                        : b.status === "Pending"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Right: Booking Details */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">
                      {b.name}
                    </h3>
                    <p className="font-mono text-xl text-gray-900">
                      {b.description}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center mt-1">
                      <FiMapPin className="mr-1 text-indigo-500" />
                      {b.location
                        ? `${b.location.city}, ${b.location.state}, ${b.location.country}`
                        : "Location not available"}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <p className="flex items-center">
                        <FiCalendar className="mr-1 text-indigo-500" />
                        <span>
                          <span className="font-medium">Check-in:</span>{" "}
                          {b.checkIn}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <FiCalendar className="mr-1 text-indigo-500" />
                        <span>
                          <span className="font-medium">Check-out:</span>{" "}
                          {b.checkOut}
                        </span>
                      </p>
                      <p className="flex items-center col-span-2">
                        <FiUsers className="mr-1 text-indigo-500" /> Guests:{" "}
                        {b.guests}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
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
      
      }

    </>
  );
}
