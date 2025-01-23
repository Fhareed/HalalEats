import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import axios from "../utils/api";
import "./MapPage.css";

// Fix Leaflet default marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/butchers/map");
        setLocations(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="map-page">
      {/* Navbar/Header */}
      <header className="map-header">
        <div className="header-logo">
          <img
            src="https://img.icons8.com/?size=100&id=lUVIQ9oJbYw4&format=png&color=000000"
            alt="Map Icon"
          />
          <h1>Butcher Locations</h1>
        </div>
        <nav className="header-nav">
          <Link to="/">
            <button className="btn signup-btn">
              <img
                src="https://img.icons8.com/?size=100&id=59809&format=png&color=000000"
                alt="Home Icon"
              />
              Home
            </button>
          </Link>
        </nav>
      </header>
      <MapContainer
        center={[60.1699, 24.9384]} // Default to Helsinki
        zoom={6}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((loc) => (
          <Marker
            key={loc._id}
            position={[loc.latitude, loc.longitude]}
            icon={L.icon({
              iconUrl: markerIcon,
              shadowUrl: markerShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <b>{loc.name}</b>
              <br />
              {loc.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
