import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { XIcon } from "lucide-react";

const MarkerList = ({
  markers,
  onClose,
}: {
  markers: { title: string; description: string }[];
  onClose: () => void;
}) => {
  return (
    <Card className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[80%] overflow-auto">
      <div className="relative">
        <CardHeader>
          <CardTitle className="text-2xl">Markers List</CardTitle>
          <button onClick={onClose} className="absolute top-0 right-0 p-4">
            <XIcon />
          </button>
        </CardHeader>
        <CardContent>
          <ul>
            {markers.map((marker, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg">{marker.title}</h3>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
    </Card>
  );
};

export default MarkerList;
