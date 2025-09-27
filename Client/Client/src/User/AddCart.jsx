import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { email } from "../AUTH/Email";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const hotels = [
  {
    id: 1,
    name: "Deluxe Room",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=96&h=96",
    details: "2 Guests · 1 King Bed · Free WiFi",
    price: 120,
  },
  {
    id: 2,
    name: "Executive Suite",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=facearea&w=96&h=96",
    details: "3 Guests · 2 Queen Beds · Breakfast Included",
    price: 180,
  },
  {
    id: 3,
    name: "Standard Room",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=96&h=96",
    details: "2 Guests · 1 Double Bed · Free Parking",
    price: 90,
  },
];

function AddCart() {
  const [cart, setCart] = useState([]);
  const [Hotel, setHotel] = useState([]);
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
        console.log(GetSavedHotel.data.Hotel, "Hotel");
        setHotel(GetSavedHotel.data.Hotel);
        setCart(GetSavedHotel.data.message);
      } catch (error) {
        return console.log(error.message);
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
  const GetInfo = (PassId) => {
    const Data = Hotel;
    navigate("/Search/Location", { state: { Data } }); 
  };
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8 mt-16">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-20">
              Your cart is empty.
            </p>
          ) : (
            cart.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => GetInfo(hotel._id)}
                title="To Get More About these Hotel Click It"
                className="flex flex-col md:flex-row items-center justify-between border-b py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <img
                    src="https://tse4.mm.bing.net/th/id/OIP.JyquK5T4iqVZlAZi4uy_oAHaFd?pid=Api&P=0&h=180"
                    alt={hotel.hotelName}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      {hotel.hotelName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {hotel.hotelDescription}
                    </p>
                    <p className="text-gray-800 font-bold mt-1">
                      ${hotel.hotelPrice} / night
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
      <Footer />
    </>
  );
}

export default AddCart;
