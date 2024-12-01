import { useMap } from "react-leaflet";
import useLocationStore, { Location } from "./stores/location";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./components/ui/menubar";
import { getCurrentPosition } from "./utils";

const Menu: React.FC = () => {
  const map = useMap();
  const { setLocation } = useLocationStore();

  const moveToCurrentPosition = async (
    setLocation: (location: Location) => void
  ) => {
    const pos = (await getCurrentPosition()) as Location;

    if (map) {
      map.setView([pos.latitude, pos.longitude], 13);
    }
    setLocation(pos);
  };

  return (
    <Menubar className="absolute bottom-0 overmap w-fit ">
      <MenubarMenu>
        <MenubarTrigger>Controls</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => moveToCurrentPosition(setLocation)}>
            New Marker {/* <MenubarShortcut>⌘T</MenubarShortcut> */}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Current Position</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
