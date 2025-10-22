import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../Navbar";
import axios from "axios";
import { email } from "../../AUTH/Email";
import Loader from "../Loaders/Loader";
const BookingsAdminUI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [UserBookingErrorMsg, setUserBookingErrorMsg] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [SelectAll, SetselectAll] = useState(false);
  const [SingleSelect, SetSingleSelect] = useState(false);
  const [TotalSelect, SetTotalselect] = useState(0);
  const [isLoader, SetLoader] = useState(false);
  const [Approveusershotel, SetusershotelApprove] = useState([]);
  const [usersName, SetusersName] = useState([]);
  // getting the bookings data of useer whohad booked api  -->http://localhost:3000/Hotel/booking/BookingUser/Admin
  useEffect(() => {
    const GetBookingData = async () => {
      try {
        SetLoader(true);
        const getBookinInfo = await axios.get(
          "http://localhost:3000/Hotel/booking/BookingUser/Admin",
          {
            params: { Email: email }, 
          }
        );

        SetusershotelApprove(getBookinInfo.data.bookings);
        SetusersName(getBookinInfo.data.userInfo);
        setUserBookingErrorMsg(getBookinInfo.data.message);
      } catch (err) {
        console.error("Axios Error:", err.message);
      } finally {
        SetLoader(false);
      }
    };

    if (email) {
      GetBookingData();
    }
  }, [email]);

  

  const totalBookings = 10;
  const statusCounts = { Pending: 3, Approved: 5, Rejected: 2 };
  const ISSelect = (index) => {
    let UsersId = Approveusershotel.map((index) => index);
    SetTotalselect(UsersId.length);
    SetselectAll((prev) => !prev);
  };

  // status checking
  const Status = (CheckStatus) => {
    // console.log(ChckStatus)
    if (CheckStatus == "All") {
      return
    }
    const GetStatus = Approveusershotel.filter((st) => st.status == CheckStatus);

    if (GetStatus.length == 0) {
      return console.log("no data found in the stauts is ", CheckStatus);
    }

    console.log(` data of the ${CheckStatus} Status  is `, GetStatus);
  };
  useEffect(() => {
    const Booking = async () => {
      try {
        const response_booking = await axios.get(
          "http://localhost:3000/Hotel/booking/BookingUser/Admin",
          {
            params: {
              Email: email,
            },
          }
        );
        setUserBookingErrorMsg(response_booking.data.message);
      } catch (err) {
        return err.message;
      }
    };
    Booking();
  }, []);

  const booking = async (CheckStatus, id) => {
    try {
      // console.log(CheckStatus, id)
      const HotelBookingResponse = await axios.put(
        "http://localhost:3000/Hotel/booking/BookingStatus/Admin",
        {
          CheckStatus,
          id,
        }
      );
      console.log(HotelBookingResponse.data.message);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <Navbar></Navbar>

      {isLoader ? (
        <Loader isLoader={isLoader}></Loader>
      ) : (
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
                      "PaymentStatus",
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
                  {Approveusershotel .map((data, id) => (
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
                       <td className="px-6 py-4 text-gray-700">{data.FirstName}</td>
                      
                      <td className="px-6 py-4 text-gray-700"> {data.hotel}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {data.location}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(data.BookingCheckIn).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                       {new Date(data.BookingCheckOut).toLocaleDateString()}

                      </td>
                      <td className="px-6 py-4 text-gray-700">{data.PaymentStatus}</td>
                      <td className="px-6 py-4 text-gray-700">
                        ₹{data.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full  font-semibold cursor-pointer ${
                            data.status == "Confirmed"
                              ? `bg-green-300 text-sm`
                              : "bg-yellow-300"
                          } text-yellow-800`}
                        >
                          {data.PaymentStatus}{" "}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2 flex-wrap">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
                          onClick={() => booking("Approve", id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                          onClick={() => booking("Reject", id)}
                        >
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
      )}
    </>
  );
};
export default BookingsAdminUI;
