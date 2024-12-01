import { Marker, Popup } from "react-leaflet";

const DraggableMarker = ({
  location,
  draggable,
}: {
  location: { latitude: number; longitude: number };
  draggable: boolean;
}) => {
  if (!location) return null;

  return (
    <Marker
      eventHandlers={{
        dragend: (e) => {
          console.log(e.target.getLatLng());
        },
      }}
      position={[location.latitude, location.longitude]}
      draggable={draggable}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default DraggableMarker;
