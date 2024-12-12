import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple, Map } from "leaflet";
import useLocationStore, { Location } from "./stores/location";
import DraggableMarker from "./DraggableMarker";
import Menu from "./Controls";
import PreventLeafletControl from "./PreventLeafletControl";

const App = () => {
  const position = [51.505, -0.09] as LatLngTuple;
  const { location } = useLocationStore();

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} id="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
        />
        {location && <DraggableMarker location={location} draggable={true} />}
        <PreventLeafletControl>
          <Menu />
        </PreventLeafletControl>
      </MapContainer>
    </div>
  );
};

export default App;
