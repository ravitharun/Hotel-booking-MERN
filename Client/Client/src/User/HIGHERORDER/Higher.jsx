import React, { useEffect, useState } from "react";
import UserLoader from "../Loader/USerLoader";
import Footer from "../Footer";
import { HiMenu } from "react-icons/hi"; // 3-line hamburger icon
import { HiX } from "react-icons/hi"; // Close icon
function Higher(WrappedComponent, withFooter = true) {
  return function EnhancedComponent(props) {
    // const [loading, setLoading] = useState(false); // loader state
    const [Isopen, SetOpen] = useState(false); // MiniNav  state
    const [Scroll, SetScroll] = useState(0); // loader state

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = Number(Number(window.scrollY).toFixed(0));
        SetScroll(scrollTop);
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
            {Scroll ? (
              <>
                <div className="fixed left-4 bottom-10 z-50">
                  <div
                    onClick={() => SetOpen((prev) => !prev)}
                    className="bg-white shadow-lg rounded-full p-3 flex items-center justify-center transition-transform transform hover:scale-110 hover:shadow-xl cursor-pointer"
                  >
                    {Isopen ? (
                      <HiX
                        className="text-red-500 transition-colors duration-300"
                        size={28}
                      />
                    ) : (
                      <HiMenu
                        className="text-blue-500 transition-colors duration-300"
                        size={28}
                      />
                    )}
                  </div>
                </div>

                {Isopen ? (
                  <>
                    <div className="fixed left-0 top-[75%] bg-gray-100 shadow z-50 w-auto px-4 py-2">
                      <div className="flex items-center text-gray-600 space-x-1">
                        <HiX
                          className="hover:text-red-500"
                          onClick={() => SetOpen((prev) => !prev)}
                        />
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
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div className="fixed left-0 top-[75%] bg-gray-100 shadow z-50 w-auto px-4 py-2">
                  <div className="flex items-center text-gray-600 space-x-1">
                    <a href="#" className="hover:text-blue-600">
                      Home
                    </a>
                    B<span>&gt;</span>
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
              </>
            )}

            <Footer />
          </>
        ) : null}{" "}
        {/* 👈 conditional */}
      </>
    );
  };
}
export default Higher;
