import { useMap } from "react-leaflet";
import useLocationStore, { Location } from "./stores/location";
import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./components/ui/menubar";
import { getCurrentPosition } from "./utils";
import DraggableMarker from "./DraggableMarker";
import MarkerList from "./MarkerList";

const Menu: React.FC = () => {
  const map = useMap();
  const { setLocation } = useLocationStore();
  const [markers, setMarkers] = useState<
    {
      location: Location;
      title: string;
      description: string;
      photo: string | null;
    }[]
  >(() => {
    const savedMarkers = localStorage.getItem("markers");
    return savedMarkers ? JSON.parse(savedMarkers) : [];
  });
  const [isMarkerListOpen, setIsMarkerListOpen] = useState(false);

  const moveToCurrentPosition = async (
    setLocation: (location: Location) => void
  ) => {
    const pos = (await getCurrentPosition()) as Location;

    if (map) {
      map.setView([pos.latitude, pos.longitude], 13);
    }
    setLocation(pos);
  };

  const addMarker = (location: Location) => {
    const newMarkers = [
      ...markers,
      { location, title: "", description: "", photo: null },
    ];
    setMarkers(newMarkers);
    localStorage.setItem("markers", JSON.stringify(newMarkers));
  };

  const updateMarkerTitle = (index: number, newTitle: string) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, title: newTitle } : marker
    );
    setMarkers(updatedMarkers);
    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
  };

  const updateMarkerDescription = (index: number, newDescription: string) => {
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, description: newDescription } : marker
    );
    setMarkers(updatedMarkers);
    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
  };

  return (
    <>
      <Menubar className="absolute bottom-0 overmap w-fit ">
        <MenubarMenu>
          <MenubarTrigger>Controls</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() =>
                addMarker({
                  latitude: map.getCenter().lat,
                  longitude: map.getCenter().lng,
                })
              }
            >
              New Marker {/* <MenubarShortcut>⌘T</MenubarShortcut> */}
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => moveToCurrentPosition(setLocation)}>
              Current Position
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => setIsMarkerListOpen(true)}>
              View Markers
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {markers.map((marker, index) => (
        <DraggableMarker
          key={index}
          location={marker.location}
          draggable={true}
          title={marker.title}
          description={marker.description}
          onTitleChange={(newTitle) => updateMarkerTitle(index, newTitle)}
          onDescriptionChange={(newDescription) =>
            updateMarkerDescription(index, newDescription)
          }
        />
      ))}
      {isMarkerListOpen && (
        <MarkerList
          markers={markers}
          onClose={() => setIsMarkerListOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;
