import React, { useEffect, useState } from "react";
import UserLoader from "../Loader/USerLoader";
import Footer from "../Footer";
function Higher(WrappedComponent, withFooter = true) {
  return function EnhancedComponent(props) {
    console.log({ ...props }, "props");
    const [loading, setLoading] = useState(false); // loader state
    const [Scroll, SetScroll] = useState(0); // loader state

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = Number(Number(window.scrollY).toFixed(0));
        console.log(scrollTop);
        SetScroll(scrollTop);
      
      if (scrollTop >= 37) {
         console.log("hide the navbar with 3lines");
      }
      else{

       console.log("Normal navbar we will disply ")
       }
      };
      window.addEventListener("scroll", handleScroll);

      // Cleanup the listener on unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <>
        <WrappedComponent {...props} message="Hello from HOC!" />
        {withFooter && <h3>Adding new fwatures</h3>}
        {withFooter && <Footer />} {/* 👈 conditional */}
        {props.page == "DetailsPage" ? (
          <>
            {/* <div className="fixed left-0 w-full top-[40%] bg-gray-100 px-6 py-3 shadow z-50">
  <div className="max-w-2xl mx-auto flex items-center space-x-2 text-gray-600">
    <a href="#" className="hover:text-blue-600">Home</a>
    <span>&gt;</span>
    <a href="#" className="hover:text-blue-600">Search Hotel</a>
    <span>&gt;</span>
    <a href="#" className="hover:text-blue-600">Hotel Details</a>
    <span>&gt;</span>
    <a href="#" className="hover:text-blue-600">Booking</a>
    <span>&gt;</span>
    <span className="text-gray-400">Payment</span>
  </div>
</div> */}
            <div className="fixed left-0 top-[75%] bg-gray-100 shadow z-50 w-auto px-4 py-2">
              <div className="flex items-center text-gray-600 space-x-1">
                <a href="#" className="hover:text-blue-600">
                  Home
                </a>
                <span>&gt;</span>
                <a href="#" className="hover:text-blue-600">
                  Search Hotel
                </a>
                <span>&gt;</span>
                <a href="#" className="hover:text-blue-600">
                  Hotel Details
                </a>
                <span>&gt;</span>
                <a href="#" className="hover:text-blue-600">
                  Booking
                </a>
                <span>&gt;</span>
                <span className="text-gray-400">Payment</span>
              </div>
            </div>

            <Footer />
          </>
        ) : null}{" "}
        {/* 👈 conditional */}
      </>
    );
  };
}
export default Higher;
