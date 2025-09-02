import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HotelMap = ({ lat, lon, name }) => {
  return (
    <MapContainer center={[lat, lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lon]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default HotelMap;
