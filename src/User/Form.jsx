import React, { useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaChild,
  FaMapMarkerAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import SearchHotel from "./SearchHotel";

export default function Form() {
  const [Dropdown, setDropdown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const Destination = useRef("");
  const checkOut = useRef("");
  const checkIn = useRef("");
  const [Userdata, setdata] = useState([]);
  const serachHotel = () => {
    const data = {
      Destination: Destination.current.value,
      checkIn: checkIn.current.value,
      checkOut: checkOut.current.value,
      adults: adults,
      children: children,
    };
    console.log(data);
    setdata(data);
  };
  return (
    <>
      <div className="mt-16 p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Destination */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Destination
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                ref={Destination}
                placeholder="Search your favorite place..."
                className="flex-1 outline-none"
              />
            </div>
          </div>

          {/* Check-In */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Check-In
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <input
                type="date"
                className="flex-1 outline-none"
                ref={checkIn}
              />
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Check-Out
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
              <FaCalendarAlt className="text-gray-500 mr-2" />
              <input
                type="date"
                className="flex-1 outline-none"
                ref={checkOut}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 flex flex-col relative">
            <label
              className="text-sm font-medium text-gray-600 mb-1 flex items-center justify-between cursor-pointer"
              onClick={() => setDropdown(!Dropdown)}
            >
              Guests
            </label>

            <div
              className="flex items-center justify-between border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
              onClick={() => setDropdown(!Dropdown)}
            >
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-500" />
                <span>
                  {adults} Adults, {children} Children
                </span>
              </div>
              {Dropdown ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>

            {Dropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg p-4 space-y-3 z-10">
                {/* Adults */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    <span>Adults</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}
                    >
                      -
                    </button>
                    <span>{adults}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaUserFriends className="text-gray-500" />
                    <span>Children</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        setChildren(children > 0 ? children - 1 : 0)
                      }
                    >
                      -
                    </button>
                    <span>{children}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => setChildren(children + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-400 hover:cursor-pointer transition whitespace-nowrap"
            onClick={serachHotel}
          >
            Search Hotels
          </button>
        </div>
      </div>
      {/* <SearchHotel Userdata={Userdata}></SearchHotel> */}
    </>
  );
}
