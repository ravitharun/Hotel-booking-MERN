import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import HotelMap from "./HotelMap";

function UserLivelocation() {
  const [userLocation, setuserLocation] = useState({
    latitude: "",
    longitude: "",
    Name: "",
  });
  useEffect(() => {
    const GetUSerLiveLcoation = () => {
      if (!navigator.geolocation) {
        toast.error("❌ Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        setuserLocation({
          latitude: lat,
          longitude: lon,
          Name: "Your Live Location",
        });
      });
    };
    GetUSerLiveLcoation();
  }, []);
  console.log(userLocation, "userLocation");
  return (
    <>
      <Toaster position="top-center" reverseOrder="false"></Toaster>
    
    </>
  );
}

export default UserLivelocation;
