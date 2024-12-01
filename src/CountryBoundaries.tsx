import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import countryData from "./data/JPN.geo.json";
import { FeatureCollection } from "geojson";

const CountryBoundaries = () => {
  const map = useMap(); // Access the Leaflet map instance

  useEffect(() => {
    if (countryData) {
      // Create a GeoJSON layer for the data
      const geoJsonLayer = new L.GeoJSON(countryData as FeatureCollection);

      // Fit map bounds to the GeoJSON data
      const bounds = geoJsonLayer.getBounds();
      map.fitBounds(bounds);
    }
  }, [map]);

  return <GeoJSON data={countryData as FeatureCollection} />; // Render the GeoJSON layer
};

export default CountryBoundaries;
