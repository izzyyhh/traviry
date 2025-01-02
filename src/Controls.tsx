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

const Menu: React.FC = () => {
  const map = useMap();
  const { setLocation } = useLocationStore();
  const [markers, setMarkers] = useState<
    { location: Location; description: string; photo: string | null }[]
  >(() => {
    const savedMarkers = localStorage.getItem("markers");
    return savedMarkers ? JSON.parse(savedMarkers) : [];
  });

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
    const newMarkers = [...markers, { location, description: "", photo: null }];
    setMarkers(newMarkers);
    localStorage.setItem("markers", JSON.stringify(newMarkers));
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
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {markers.map((marker, index) => (
        <DraggableMarker
          key={index}
          location={marker.location}
          draggable={true}
          description={marker.description}
          photo={marker.photo}
        />
      ))}
    </>
  );
};

export default Menu;
