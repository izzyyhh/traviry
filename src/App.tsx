import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import useLocationStore, { Location } from "./stores/location";
import Menu from "./Controls";
import PreventLeafletControl from "./PreventLeafletControl";
import { getCurrentPosition } from "./utils";

const App = () => {
  const { location, setLocation } = useLocationStore();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleGetCurrentPosition = async () => {
    setLoading(true);
    const pos = await getCurrentPosition();
    if (pos) {
      setLocation(pos as Location);
      setShowMap(true);
    }
    setLoading(false);
  };

  return (
    <div className="app-container map-container">
      {!showMap ? (
        <div className="welcome-screen flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Traviry - Travel Diary</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleGetCurrentPosition}
          >
            {loading ? "Loading..." : "Start Your Journey"}
          </button>
        </div>
      ) : (
        <MapContainer
          center={[location!.latitude, location!.longitude]}
          zoom={13}
          scrollWheelZoom={true}
          id="map"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
          <PreventLeafletControl>
            <Menu />
          </PreventLeafletControl>
        </MapContainer>
      )}
    </div>
  );
};

export default App;
