import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
function NetWorkCheck() {
  useEffect(() => {

    const handleOnline = () => toast.success("You are online");
    const handleOffline = () => toast.error("You are Offline");

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  ); // No UI needed for alerts
}

export default NetWorkCheck;
