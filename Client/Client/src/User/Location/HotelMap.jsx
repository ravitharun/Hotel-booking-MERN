import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix for missing marker icons in React
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HotelMap = ({ lat, lon, name, hotelLat, hotelLong, HotelLocation }) => {
  let latitude = Number(lat);
  let longitude = Number(lon);
  let hotelLatiude = Number(hotelLat);
  let hotelLongitude = Number(hotelLong);
  // ✅ Validate lat/lon range
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    console.warn("Invalid coordinates, falling back to Bangalore");
    latitude = 12.9716;
    longitude = 77.5946;
    name = "Default: Bangalore";
  }
  // diff
  let dLat = ((hotelLat - lat) * Math.PI) / 180;
  let dLon = ((hotelLong - lon) * Math.PI) / 180;

  console.log({ dLat: dLat, dLon: dLon });
  // dLat=-4.353152799999998
  // dLon= 1.8306615999999991
  const R = 6371;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat) * Math.cos(lat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // console.log(distance.toLocaleString(),'Km')
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={20}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]} icon={defaultIcon}>
          <Popup>{name}</Popup>
        </Marker>
        <Marker position={[hotelLatiude, hotelLongitude]} icon={defaultIcon}>
          <Popup>
            {HotelLocation} - {distance.toFixed(2)} Km
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HotelMap;
