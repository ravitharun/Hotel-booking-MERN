import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "../src/AUTH/Signup";
import Login from "../src/AUTH/Login";
import Home from "./User/Home";
createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Create" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </Router>
);
