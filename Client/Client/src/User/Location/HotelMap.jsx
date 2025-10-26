import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix for missing marker icons in React
const defaultIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/139/139899.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const UserLivelocation = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64572.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HotelMap = ({
  lat,
  lon,
  name,
  filteredHotelsLocation,
  NewLong,
  NewLat,
  NewHotelLocation,
}) => {
  let latitude = Number(lat);
  let longitude = Number(lon);
  //  Validate lat/lon range
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    console.warn("Invalid coordinates, falling back to Bangalore");
    latitude = 12.9716;
    longitude = 77.5946;
    name = "Default: Bangalore";
  }
  // diff
  let dLat = ((NewLat - lat) * Math.PI) / 180;
  let dLon = ((NewLong - lon) * Math.PI) / 180;
  // dLat=-4.353152799999998
  // dLon= 1.8306615999999991
  const R = 6371;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat) * Math.cos(lat) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  console.log({
    lat,
    lon,
    name,

    NewLong,
    NewLat,
    NewHotelLocation,
  });
  console.log(filteredHotelsLocation, "filteredHotelsLocation");
  // latitude
  // longitude

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        borderRadius: "50px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {filteredHotelsLocation.map((Hotellocation) => (
          <Marker
            position={[Hotellocation.latitude, Hotellocation.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              {Hotellocation.address}- {Hotellocation.city}{" "}
            </Popup>
          </Marker>
        ))}
        {latitude & longitude && (
          <>
            <Marker position={[latitude, longitude]} icon={UserLivelocation}>
              <Popup title="hi">{name}</Popup>
            </Marker>
          </>
        )}
        {NewLong & NewLat && (
          <>
            <Marker position={[NewLat, NewLong]} icon={defaultIcon}>
              <Popup>
                {NewHotelLocation} - {distance.toFixed(2)} Km
              </Popup>
            </Marker>
            <Polyline positions={[]} color="blue" />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default HotelMap;
