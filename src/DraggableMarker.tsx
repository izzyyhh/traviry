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
  description: initialDescription,
  photo: initialPhoto,
}: {
  location: { latitude: number; longitude: number };
  draggable: boolean;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  if (!location) return null;
  // TODO: hovercard would be cool

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
                <textarea
                  placeholder="Add a description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <button onClick={() => setIsPopoverOpen(false)}>Close</button>
              </div>
            </LayerGroup>
          )}
        </Popover>
      </PreventLeafletControl>
    </Marker>
  );
};

export default DraggableMarker;
