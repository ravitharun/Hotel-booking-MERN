import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import { email } from "../../AUTH/Email";
import { FaLocationArrow } from "react-icons/fa";
import Loader from "../Loaders/Loader";

function AdminManageHotel() {
  const [GetHotelaAdmin, setGetHotelaAdmin] = useState([]);
  const [isLoader, SetLoader] = useState(false);

  useEffect(() => {
    const HotelManage = async () => {
      try {
        SetLoader(true);
        const GetHotelResponse = await axios.get(
          "http://localhost:3000/Hotel/booking/ManageHotel/Admin",
          { params: { Email: email } }
        );
        setGetHotelaAdmin(GetHotelResponse.data.message);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        SetLoader(false);
      }
    };
    HotelManage();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-20 text-center px-4">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-800">
          Manage Your Hotels with Ease
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Here you can view, edit, and delete hotels that you’ve added. Keep your
          listings up-to-date to give users the best booking experience.
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md transition transform hover:scale-105">
            ➕ Add New Hotel
          </button>
        </div>
      </div>

      {/* Loader */}
      {isLoader ? (
        <Loader isLoader={isLoader} />
      ) : (
        <div className="min-h-screen px-6 mt-10">
          {GetHotelaAdmin.length === 0 ? (
            <h1 className="text-2xl sm:text-3xl font-bold text-center mt-20 text-gray-800">
              No Hotels Added
            </h1>
          ) : (
            <div className="mt-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
                Hotels Added
              </h1>

              {/* Hotel Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {GetHotelaAdmin.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 bg-white overflow-hidden transform hover:scale-[1.02]"
                  >
                    {/* Hotel Image */}
                    <img
                      className="h-56 w-full object-cover"
                      src="https://sp.yimg.com/ib/th?id=OADD2.9964418807321_19MNEPN6RMRRRKZ412&pid=21.2&c=16&roil=0&roit=0&roir=1&roib=1&w=442&h=231"
                      alt={item.name}
                    />

                    {/* Hotel Details */}
                    <div className="p-5 text-left">
                      <h5 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                        {item.name}
                      </h5>

                      <p
                        className="text-gray-600 mt-2 flex items-center gap-2 text-sm"
                        title="Location"
                      >
                        <FaLocationArrow className="text-blue-600 mt-[2px]" />
                        <span>
                          {item.location.country}, {item.location.city},{" "}
                          <span className="text-red-500 font-medium">
                            {item.location.state}
                          </span>
                        </span>
                      </p>

                      <p className="text-gray-700 mt-3 text-sm line-clamp-2">
                        {item.description}
                      </p>

                      {/* Price & Rating */}
                      <div className="mt-4 space-y-1 text-sm">
                        <p className="text-gray-700">
                          💰 Price:{" "}
                          <span className="font-semibold text-green-600">
                            {item.rooms[0].price} / night
                          </span>
                        </p>
                        <p className="text-gray-700">
                          ⭐ Rating:{" "}
                          <span className="font-semibold text-yellow-500">
                            {item.rating}/5
                          </span>
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-5">
                        <button className="w-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow">
                          Edit
                        </button>
                        <button className="w-1/2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminManageHotel;
