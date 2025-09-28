import React, { useEffect, useState } from "react";
import Home from "../src/User/Home";
import AdminHomepage from "./Admin/Pages/AdminHomepage";
import Cart from "./User/Cart";
import SearchHotelpage from "./User/SearchHotel";
function App() {
  const [role, setRole] = useState("");
  useEffect(() => {
    let role = localStorage.getItem("Role");
    setRole(role);
  }, []);

  return <>{role === "user" ? <Home /> : <AdminHomepage />}</>;
}

export default App;
