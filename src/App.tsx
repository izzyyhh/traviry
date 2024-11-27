import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import Controls from "./Controls";

const App = () => {
  const position = [51.505, -0.09] as LatLngTuple;

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} id="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Controls></Controls>
      </MapContainer>
    </div>
  );
};

export default App;
