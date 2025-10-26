import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import HotelMap from "../Location/HotelMap";

function UserLivelocation({
  NewLong,
  NewLat,
  NewHotelLocation,
  filteredHotelsLocation,
}) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState("");


  useEffect(() => {
    const GetUserLiveLocation = () => {
      if (!navigator.geolocation) {
        toast.error("❌ Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationName("Your Live Location");
        },
        (error) => {
          toast.error("⚠️ Unable to fetch location");
          console.error(error);
        }
      );
    };

    GetUserLiveLocation();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="px-4 py-6 bg-gradient-to-r from-blue-100 to-white rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Find Hotels Near You
            </h2>
            <p className="text-gray-600">
              {latitude && longitude
                ? `Your current location: ${locationName}`
                : "Fetching your live location..."}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-all duration-200"
          >
            Refresh Location
          </button>
        </div>
      </div>

      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg mb-6">
        {latitude && longitude ? (
          <HotelMap
            lat={latitude}
            filteredHotelsLocation={filteredHotelsLocation}
            lon={longitude}
            name={locationName}
            hotelLat={13.0827}
            hotelLong={80.2707}
            HotelLocation={"Chennai"}
            NewLong={NewLong}
            NewLat={NewLat}
            NewHotelLocation={NewHotelLocation}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 font-medium">
            Loading map...
          </div>
        )}
      </div>
    </>
  );
}

export default UserLivelocation;
