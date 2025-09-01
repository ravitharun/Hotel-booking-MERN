import React from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";

export default function HotelInfo() {
  const HotelSearchData=useLocation()
  console.log(HotelSearchData.state.data)
  return (
    <>
    <Navbar></Navbar>
      <h3>HotelInfo</h3>
  
    </>
  );
}
