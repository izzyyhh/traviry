/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { Map } from "leaflet";
import { useMap } from "react-leaflet";

interface PreventLeafletControlProps {
  children: React.ReactNode;
}

const PreventLeafletControl = ({ children }: PreventLeafletControlProps) => {
  const controlRef = useRef<HTMLDivElement | null>(null);
  const leaflet = useMap() as Map & { _events: any; _handlers: any };

  useEffect(() => {
    if (controlRef.current && leaflet) {
      const el = controlRef.current;
      const originalEvents = { ...leaflet._events };

      const handleMouseOver = () => {
        leaflet._events = {};
        leaflet._handlers.forEach((handler: any) => handler.disable());
      };

      const handleMouseOut = () => {
        leaflet._handlers.forEach((handler: any) => handler.enable());
        leaflet._events = originalEvents;
      };

      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);

      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (
            mutation.type === "childList" &&
            mutation.removedNodes.length > 0
          ) {
            handleMouseOut();
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
        observer.disconnect();
      };
    }
  }, [leaflet]);

  return <div ref={controlRef}>{children}</div>;
};

export default PreventLeafletControl;
