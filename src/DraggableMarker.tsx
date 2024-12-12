import { useState } from "react";
import { LayerGroup, Marker } from "react-leaflet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover"; // Using your original import path
import PreventLeafletControl from "./PreventLeafletControl";

const DraggableMarker = ({
  location,
  draggable,
}: {
  location: { latitude: number; longitude: number };
  draggable: boolean;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to control popover visibility

  if (!location) return null;

  return (
    <Marker
      eventHandlers={{
        click: () => {
          if (!isPopoverOpen) setIsPopoverOpen(true);
        },
        dragend: (e) => {
          console.log(e.target.getLatLng());
        },
      }}
      position={[location.latitude, location.longitude]}
      draggable={draggable}
    >
      <PreventLeafletControl>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          {isPopoverOpen && (
            <LayerGroup>
              <div className="absolute bg-white w-screen min-h-72">
                <div>This is the content of the popover!</div>
                <button onClick={() => setIsPopoverOpen(false)}>dddd</button>
              </div>
            </LayerGroup>
          )}
        </Popover>
      </PreventLeafletControl>
    </Marker>
  );
};

export default DraggableMarker;
