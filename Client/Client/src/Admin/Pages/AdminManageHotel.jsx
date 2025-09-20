import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import { email } from "../../AUTH/Email";
import { FaLocationArrow } from "react-icons/fa";

function AdminManageHotel() {
  const [GetHotelaAdmin, setGetHotelaAdmin] = useState([]);

  useEffect(() => {
    const HotelManage = async () => {
      try {
        const GetHotelResponse = await axios.get(
          "http://localhost:3000/Hotel/booking/ManageHotel/Admin",
          { params: { Email: email } }
        );
        setGetHotelaAdmin(GetHotelResponse.data.message);
        console.log(GetHotelResponse.data.message);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    HotelManage();
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div className="min-h-screen px-6 mt-5">
        {GetHotelaAdmin.length === 0 ? (
          <h1 className="text-3xl font-bold text-center mt-20 text-gray-800">
            No Hotels Added
          </h1>
        ) : (
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-center text-gray-900">
              Hotels Added
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {GetHotelaAdmin.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
                >
                  <img
                    className="h-56 w-full object-cover rounded-t-xl"
                    src="https://sp.yimg.com/ib/th?id=OADD2.9964418807321_19MNEPN6RMRRRKZ412&pid=21.2&c=16&roil=0&roit=0&roir=1&roib=1&w=442&h=231"
                    alt={item.name}
                  />
                  <div className="p-5">
                    <h5 className="text-xl font-semibold text-gray-900 truncate">
                      {item.name}
                    </h5>
                    <p
                      className="text-gray-600 mt-2 flex items-center gap-2"
                      title="Location"
                    >
                      <FaLocationArrow className="text-blue-600 mt-[2px]" />
                      <span>
                        {item.location.country}, {item.location.city},{" "}
                        <span className="text-red-500 font-medium">
                          {item.location.state}
                        </span>
                      </span>
                    </p>{" "}
                    <p className="text-gray-700 mt-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-4 space-y-1">
                      <p className="text-sm text-gray-700">
                        💰 Price:{" "}
                        <span className="font-semibold text-green-600">
                          {item.rooms[0].price} / night
                        </span>
                      </p>
                      <p className="text-sm text-gray-700">
                        ⭐ Rating:{" "}
                        <span className="font-semibold text-yellow-500">
                          {item.rating}/5
                        </span>
                      </p>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-3 mt-5">
                      <button className="w-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                        Edit
                      </button>
                      <button className="w-1/2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 👇 Downside section */}
            <div className="mt-16 text-center border-t pt-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Manage Your Hotels with Ease
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Here you can view, edit, and delete hotels that you’ve added.
                Keep your listings up-to-date to give users the best booking
                experience.
              </p>
              <div className="mt-6">
                <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  ➕ Add New Hotel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminManageHotel;
