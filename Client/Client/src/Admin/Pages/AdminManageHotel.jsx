import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import axios from "axios";
import { email } from "../../AUTH/Email";

function AdminManageHotel() {
  const [GetHotelaAdmin, setGetHotelaAdmin] = useState([]);

  useEffect(() => {
    const HotelManage = async () => {
      const GetHotelResponse = await axios.get(
        "http://localhost:3000/Hotel/booking/ManageHotel/Admin",
        {
          params: {
            Email: email,
          },
        }
      );
      console.log(email,'enail')
      setGetHotelaAdmin(GetHotelResponse.data.message);
    };
    HotelManage();
  }, []);

  return (
    <>
      <Navbar />
      {GetHotelaAdmin.length == 0 ? (
        <h1 className="text-3xl font-bold text-center mt-20">
          No Hotels Added
        </h1>
      ) : (
        <div className="mt-10">
          <h1 className="text-3xl font-bold text-center">Hotels Added</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
            {GetHotelaAdmin.map((item) => {
              return (
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <img
                    className="rounded-t-lg h-48 w-full"
                    src={item.HotelImage}
                    alt=""
                  />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.HotelName}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.HotelLocation}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Price: {item.Price} /per night
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Rating: {item.Rating}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AdminManageHotel;
