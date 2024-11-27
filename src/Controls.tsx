import { useMap } from "react-leaflet";

const Controls: React.FC = () => {
  const map = useMap();

  return (
    <button
      className="btn overmap"
      onClick={() => {
        if (!navigator.geolocation) {
          console.error("Geolocation is not supported by your browser");
          return;
        }
        console.log("geolocatiopn");
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          console.log(result);
          if (result.state === "granted") {
            console.log("granted");
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                if (map) map.setView([latitude, longitude], 13);
              },
              (error) => {
                console.error("Error fetching location:", error);
              }
            );
          }
        });
        // Get the current position
      }}
    >
      PROVE WORTY
    </button>
  );
};

export default Controls;
