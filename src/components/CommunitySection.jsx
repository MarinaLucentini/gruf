import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CommunitySection = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Ottieni la posizione dell'utente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          alert("Impossibile ottenere la posizione");
        }
      );
    } else {
      alert("La geolocalizzazione non è supportata dal tuo browser.");
    }
  }, []);

  if (!userLocation) {
    return <p>Caricamento mappa...</p>; // Mostra un messaggio mentre la posizione è in fase di recupero
  }

  return (
    <div className="bg-light p-3 rounded">
      <p>Condividi le tue esperienze con la community!</p>

      {/* Mappa con la posizione dell'utente */}
      <MapContainer center={userLocation} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={userLocation}>
          <Popup>La tua posizione</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CommunitySection;
