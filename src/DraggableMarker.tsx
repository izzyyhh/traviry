import { useState } from "react";
import { LayerGroup, Marker } from "react-leaflet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover"; // Using your original import path
import PreventLeafletControl from "./PreventLeafletControl";
import MarkerContent from "./MarkerContent";

const DraggableMarker = ({
  location,
  draggable,
  title: initialTitle,
  description: initialDescription,
  onTitleChange,
  onDescriptionChange,
}: {
  location: { latitude: number; longitude: number };
  draggable: boolean;
  title: string;
  description: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    onDescriptionChange(newDescription);
  };

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
              <MarkerContent
                title={title}
                description={description}
                onTitleChange={handleTitleChange}
                onDescriptionChange={handleDescriptionChange}
                onClose={() => setIsPopoverOpen(false)}
              />
            </LayerGroup>
          )}
        </Popover>
      </PreventLeafletControl>
    </Marker>
  );
};

export default DraggableMarker;
