import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { email } from "../AUTH/Email";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Higher from "./HIGHERORDER/Higher";
function Cart() {
  const [cart, setCart] = useState([]);
 useEffect(() => {
  const GetHotelSaved = async () => {
    try {
      const GetSavedHotel = await axios.get(
        "http://localhost:3000/Hotel/booking/GetHotel/Saved",
        {
          params: {
            Email: email,
          },
        }
      );

      setCart(GetSavedHotel.data.message);


      // Store length as string in localStorage
      localStorage.setItem("Saved_Hotel", GetSavedHotel.data.message.length.toString());
    } catch (error) {
      
    }
  };
  GetHotelSaved();
}, []);


  const handleQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
          }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, hotel) => sum + hotel.price * hotel.quantity,
    0
  );
  const navigate = useNavigate();
  const GetInfo = async (PassId) => {

    const hotelBio = await axios.get("http://localhost:3000/Hotel/booking/gethotelInfo/Hotel", {
      params: {
        HotelId: PassId
      }
    })
    
    const Data = hotelBio.data.message;
    if(Data==null){
      return alert("no info got it")
    }
    navigate("/Search/Location", { state: { Data } });
  };
return (
  <>
    <Navbar />
    <div className="bg-gray-100 min-h-screen py-8 mt-16">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Saved({cart.length})</h1>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-20">
            Your cart is empty.
          </p>
        ) : (
          cart.map((hotel) => (
            <div
              key={hotel.id}
             
              title="To Get More About these Hotel Click It"
              className="flex flex-col md:flex-row items-center justify-between border-b py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4 w-full md:w-2/3">
                <img
                 onClick={() => GetInfo(hotel.Hotelid)}
                  src="https://tse4.mm.bing.net/th/id/OIP.JyquK5T4iqVZlAZi4uy_oAHaFd?pid=Api&P=0&h=180"
                  alt={hotel.hotelName}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {hotel.hotelName}erftgyhuj
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {hotel.hotelDescription}
                  </p>
                  <p className="text-gray-800 font-bold mt-1">
                    ${hotel.hotelPrice} / nights
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => handleQuantity(hotel.id, "dec")}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{hotel.quantity}</span>
                  <button
                    onClick={() => handleQuantity(hotel.id, "inc")}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(hotel.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {/* Total and Checkout */}
        {cart.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-8">
            <span className="text-2xl font-bold text-gray-800">
              Total: ${total}
            </span>
            <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>

  </>
);
}
const EnhancedMySCComponent = Higher(Cart,true);

export default function AddCart(){
  return (
    <>
   <EnhancedMySCComponent age="10" loder role='user' />


    </>
  );
};
