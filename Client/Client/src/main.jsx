import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "../src/AUTH/Signup";
import Login from "../src/AUTH/Login";
import Home from "./User/Home";
import MyBookings from "./User/MyBookings";
import HotelInfo from "./User/HotelInfo";
import SearchHotel from "./User/SearchHotel";
import MyProfile from "./User/MyProfile";
import Logout from "./AUTH/Logout";
createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/Search/Hotel" element={<SearchHotel/>} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/Search/Location" element={<HotelInfo />} />
      <Route path="/Create" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </Router>
);
