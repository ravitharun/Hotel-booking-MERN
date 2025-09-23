import React from "react";
import {
  FaUserTie,
  FaUserGraduate,
  FaUserShield,
  FaUserAlt,
} from "react-icons/fa";

function UserLoader({ isloading, role = "user" }) {
  const getRoleIcon = () => {
    switch (role) {
      case "admin":
        return (
          <FaUserShield className="w-16 h-16 text-red-500 drop-shadow-lg" />
        );
      case "instructor":
        return (
          <FaUserTie className="w-16 h-16 text-indigo-500 drop-shadow-lg" />
        );
      case "student":
        return (
          <FaUserGraduate className="w-16 h-16 text-green-500 drop-shadow-lg" />
        );
      default:
        return <FaUserAlt className="w-16 h-16 text-gray-500 drop-shadow-lg" />;
    }
  };

  return (
    <>
      {isloading && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-yellow-100">
          {/* Orbit Loader */}
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Role Icon (center) */}
            <div className="absolute">{getRoleIcon()}</div>

            {/* Orbiting dots */}
            <div className="absolute w-32 h-32 border-2 border-dashed border-blue-300 rounded-full animate-spin-slow flex items-center justify-center"></div>
            <span className="absolute w-4 h-4 bg-yellow-400 rounded-full -top-2 animate-ping"></span>
            <span className="absolute w-3 h-3 bg-pink-500 rounded-full -right-2 animate-pulse"></span>
            <span className="absolute w-3 h-3 bg-green-500 rounded-full -bottom-2 animate-bounce"></span>
          </div>

          {/* Message */}
          <p className="mt-8 text-lg md:text-xl font-bold text-gray-800 text-center animate-pulse">
            Loading  the hotels... 
          </p>
        </div>
      )}
    </>
  );
}

export default UserLoader;
