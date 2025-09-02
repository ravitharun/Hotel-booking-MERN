import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import HotelMap from "../Location/HotelMap";
// import HotelMap from "./HotelMap";

function UserLivelocation({ NewLong, NewLat ,NewHotelLocation}) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState("");
  console.log({ NewLong, NewLat }, "from user live location");

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
      <div className="px-4">
        {latitude && longitude ? (
          <HotelMap
            lat={latitude}
            lon={longitude}
            name={locationName}
            hotelLat={13.0827}
            hotelLong={80.2707}
            HotelLocation={"chennai"}
            NewLong={NewLong}
            NewLat={NewLat}
            NewHotelLocation={NewHotelLocation}
          />
        ) : (
          <p>Fetching your live location...</p>
        )}
      </div>
    </>
  );
}

export default UserLivelocation;
