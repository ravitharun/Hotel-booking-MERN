import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../Navbar";
import { useEffect } from "react";
import axios from "axios";
import { email } from "../../AUTH/Email";

const BookingsAdminUI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [UserBookingErrorMsg, setUserBookingErrorMsg] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [SelectAll, SetselectAll] = useState(false);
  const [SingleSelect, SetSingleSelect] = useState(false);
  const [TotalSelect, SetTotalselect] = useState(0);
  // Sample booking counts

  const usershotel = [
    {
      id: 1,
      user: "John Doe".toLowerCase(),
      hotel: "Ocean View Hotel",
      location: "Goa",
      checkIn: "2025-09-10",
      checkOut: "2025-09-15",
      rooms: 2,
      price: 7500,
      status: "Confirmed",
    },
    {
      id: 2,
      user: "Ravi Tharun".toLowerCase(),
      hotel: "Palm Tree Resort",
      location: "Kerala",
      checkIn: "2025-10-01",
      checkOut: "2025-10-05",
      rooms: 1,
      price: 5000,
      status: "Pending",
    },
    {
      id: 22,
      user: "Ravi Tharun".toLowerCase(),
      hotel: "Palm Tree Resort",
      location: "Kerala",
      checkIn: "2025-10-01",
      checkOut: "2025-10-05",
      rooms: 1,
      price: 5000,
      status: "Pending",
    },
    {
      id: 3,
      user: "Pranav Kumar".toLowerCase(),
      hotel: "Hilltop Retreat",
      location: "Manali",
      checkIn: "2025-11-12",
      checkOut: "2025-11-18",
      rooms: 3,
      price: 12000,
      status: "Cancelled",
    },
    {
      id: 4,
      user: "Anita Sharma".toLowerCase(),
      hotel: "Royal Palace",
      location: "Jaipur",
      checkIn: "2025-09-20",
      checkOut: "2025-09-25",
      rooms: 2,
      price: 8800,
      status: "Confirmed",
    },
    {
      id: 5,
      user: "Michael Smith".toLowerCase(),
      hotel: "City Lights Hotel",
      location: "Mumbai",
      checkIn: "2025-09-28",
      checkOut: "2025-10-02",
      rooms: 1,
      price: 6400,
      status: "Pending",
    },
    {
      id: 6,
      user: "Sophia Patel".toLowerCase(),
      hotel: "Desert Sands Resort",
      location: "Jaisalmer",
      checkIn: "2025-12-05",
      checkOut: "2025-12-10",
      rooms: 2,
      price: 9300,
      status: "Confirmed",
    },
    {
      id: 7,
      user: "Aarav Mehta".toLowerCase(),
      hotel: "Snow Valley Inn",
      location: "Shimla",
      checkIn: "2025-11-02",
      checkOut: "2025-11-07",
      rooms: 1,
      price: 7200,
      status: "Cancelled",
    },
    {
      id: 8,
      user: "Emily Johnson".toLowerCase(),
      hotel: "Lakeview Resort",
      location: "Udaipur",
      checkIn: "2025-09-14",
      checkOut: "2025-09-18",
      rooms: 2,
      price: 10100,
      status: "Confirmed",
    },
    {
      id: 9,
      user: "Rajesh Kumar".toLowerCase(),
      hotel: "Sunrise Hotel",
      location: "Delhi",
      checkIn: "2025-10-15",
      checkOut: "2025-10-19",
      rooms: 3,
      price: 15000,
      status: "Pending",
    },
    {
      id: 10,
      user: "Olivia Brown".toLowerCase(),
      hotel: "Green Garden Hotel",
      location: "Pune",
      checkIn: "2025-11-25",
      checkOut: "2025-11-30",
      rooms: 1,
      price: 5600,
      status: "Confirmed",
    },
  ];

  // checking the input Filed
  let searchArray = [];
  for (let i = 0; i < usershotel.length; i++) {
    if (usershotel[i].user.includes(searchTerm.toLowerCase())) {
      searchArray.push(usershotel[i]);
    } else {
      console.log("no users found");
    }
  }
  // console.log(searchArray.length <= 0 ? "No User's Found" : searchArray);

  const totalBookings = 10;
  const statusCounts = { Pending: 3, Approved: 5, Rejected: 2 };
  const ISSelect = (index) => {
    let UsersId = usershotel.map((index) => index);
    SetTotalselect(UsersId.length);
    SetselectAll((prev) => !prev);
  };

  // status checking
  const Status = (CheckStatus) => {
    // console.log(ChckStatus)
    if (CheckStatus == "All") {
      return console.log(usershotel);
    }
    const GetStatus = usershotel.filter((st) => st.status == CheckStatus);

    if (GetStatus.length == 0) {
      return console.log("no data found in the stauts is ", CheckStatus);
    }

    console.log(` data of the ${CheckStatus} Status  is `, GetStatus);
  };
  useEffect(() => {
    const Booking = async () => {
      const response_booking = await axios.get(
        "http://localhost:3000/Hotel/booking/BookingUser/Admin",
        {
          params: {
            Email: email,
            // Email: 'owner.delhi@theleela.com',
          },
        }
      );
      {
        response_booking.data.bookings.length == 0
          ? setUserBookingErrorMsg("No data Found yet")
          : "";
      }
    };
    Booking();
  }, []);

  console.log(UserBookingErrorMsg, "UserBookingErrorMsg");


  const BookingStatus=async(CheckStatus)=>
  {
    console.log(CheckStatus)
  
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Hotel Bookings
        </h2>

        {/* Booking Counts */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="px-4 py-2 bg-gray-100 rounded shadow">
            Total Bookings:{" "}
            <span className="font-semibold">{totalBookings}</span>
          </div>
          <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded shadow">
            Pending: {statusCounts.Pending}
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-800 rounded shadow">
            Approved: {statusCounts.Approved}
          </div>
          <div className="px-4 py-2 bg-red-100 text-red-800 rounded shadow">
            Rejected: {statusCounts.Rejected}
          </div>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="flex items-center border rounded-lg overflow-hidden w-full md:w-1/3">
            <FaSearch className="text-gray-400 px-2" />
            <input
              type="text"
              placeholder="Search by user, hotel, or location..."
              className="w-full px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
              <button
                key={status.id}
                onClick={() => Status(status)}
                className={`px-4 py-2 rounded ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div
          className="flex items-center gap-2 mb-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm w-max"
          onClick={() => ISSelect(status.id)}
        >
          <input
            type="checkbox"
            id="selectAll"
            className="h-4 w-4 text-blue-600 border-gray-400 rounded focus:ring-blue-500"
            checked={SelectAll}
          />
          <label
            htmlFor="selectAll"
            className="text-gray-700 font-medium cursor-pointer"
            onClick={() => ISSelect(status.id)}
          >
            Select All
          </label>
        </div>
        {SelectAll && (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-80">
                <h2 className="text-lg font-bold text-gray-800">
                  Confirm Delete
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to delete all selected users
                  <br />
                  <div className=" px-4 py-2 bg-blue-100 border border-blue-300  text-blue-800 font-medium text-center">
                    <h3>
                      Total Selected: {TotalSelect} User
                      {TotalSelect > 1 ? "s" : ""}
                    </h3>
                  </div>
                  {/* <br /> */}
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    onClick={() => ISSelect(status.id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => {
                      alert("calling the api for the delete /delete");
                      SetselectAll((prev) => !prev);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Booking Table */}
        {UserBookingErrorMsg ? (
          <div className="flex justify-center items-center mt-4">
            <span className="text-red-500 font-medium">
              {UserBookingErrorMsg}
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Bulk Action",
                    "ID",
                    "User",
                    "Hotel",
                    "Location",
                    "Check-In",
                    "Check-Out",
                    "Rooms",
                    "Price",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usershotel.map((data, id) => (
                  <tr
                    key={id}
                    className={`transition-all duration-200 bg-white hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={SelectAll}
                        onClick={() => ISSelect(id)}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {id}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{data.user}</td>
                    <td className="px-6 py-4 text-gray-700"> {data.hotel}</td>
                    <td className="px-6 py-4 text-gray-700">{data.location}</td>
                    <td className="px-6 py-4 text-gray-700">{data.checkIn}</td>
                    <td className="px-6 py-4 text-gray-700">{data.checkOut}</td>
                    <td className="px-6 py-4 text-gray-700">{data.status}</td>
                    <td className="px-6 py-4 text-gray-700">
                      ₹{data.price * 1000}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full  font-semibold cursor-pointer ${
                          data.status == "Confirmed"
                            ? `bg-green-300 text-sm`
                            : "bg-yellow-300"
                        } text-yellow-800`}
                      >
                        {data.status}{" "}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2 flex-wrap">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow" onClick={ BookingStatus('Approve',data._id)}>
                        Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow" onClick={BookingStatus('Reject',data._id)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* // {sele}
    //  */}
    </>
  );
};

export default BookingsAdminUI;
