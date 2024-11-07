import { useEffect, useRef, useState } from "react";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import type { MapRef, MapStyle } from "react-map-gl/maplibre";

import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MapImage } from "@/components/map-images";
import mapStyle from "./no_poi_warm.json";
import water from "@/sources/water.json";
import road from "@/sources/road.json";
import boundaries from "@/sources/boundaries.json";
import community from "@/sources/community.json";
import museum from "@/sources/museum.json";
import art from "@/sources/art.json";

function App() {
  const mapRef = useRef<MapRef | null>(null);
  const [activeLayerIds, setActiveLayerIds] = useState([
    "road",
    "boundaries",
    "community",
    "museum",
    "art",
    "water",
  ]);

  useEffect(() => {
    if (!mapRef.current) return;

    const allLayerIds = [
      "road",
      "boundaries",
      "community",
      "museum",
      "art",
      "water",
    ];

    // for each layerId, check whether it is included in activeLayerIds,
    // show and hide accordingly by setting layer visibility
    allLayerIds.forEach((layerId) => {
      if (activeLayerIds.includes(layerId)) {
        mapRef.current
          ?.getMap()
          .setLayoutProperty(layerId, "visibility", "visible");
        if (layerId === "water") {
          mapRef.current
            ?.getMap()
            .setLayoutProperty("water-outline", "visibility", "visible");
        }
      } else {
        mapRef.current
          ?.getMap()
          .setLayoutProperty(layerId, "visibility", "none");
        if (layerId === "water") {
          mapRef.current
            ?.getMap()
            .setLayoutProperty("water-outline", "visibility", "none");
        }
      }
    });
  }, [activeLayerIds]);

  const handleCheckedChange = (layerId: string) => {
    if (activeLayerIds.includes(layerId)) {
      setActiveLayerIds(activeLayerIds.filter((d) => d !== layerId));
    } else {
      setActiveLayerIds([...activeLayerIds, layerId]);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        activeLayerIds={activeLayerIds}
        handleCheckedChange={handleCheckedChange}
      />
      <main className="flex-1">
        <div className="relative h-full w-full">
          <SidebarTrigger className="absolute left-0 top-0 z-10" />
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: 85.2955,
              latitude: 27.6431,
              zoom: 14.5,
            }}
            mapStyle={mapStyle as MapStyle}
          >
            <MapImage />
            <Source type="geojson" data={road}>
              <Layer
                id="road"
                type="line"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "#ef4444",
                  "line-width": 2,
                }}
              />
            </Source>
            <Source type="geojson" data={boundaries}>
              <Layer
                id="boundaries"
                type="line"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "#3b82f6",
                  "line-width": 1,
                  "line-opacity": 0.7,
                }}
              />
            </Source>
            <Source type="geojson" data={community}>
              <Layer
                id="community"
                type="symbol"
                layout={{
                  "icon-image": "community",
                  "icon-size": 0.69,
                  "icon-allow-overlap": true,
                }}
              />
            </Source>
            <Source type="geojson" data={museum}>
              <Layer
                id="museum"
                type="symbol"
                layout={{
                  "icon-image": "museum-icon",
                  "icon-size": 0.69,
                  "icon-allow-overlap": true,
                }}
              />
            </Source>
            <Source type="geojson" data={art}>
              <Layer
                id="art"
                type="symbol"
                layout={{
                  "icon-image": "temple-icon",
                  "icon-size": 0.69,
                  "icon-allow-overlap": true,
                }}
              />
            </Source>
            <Source type="geojson" data={water}>
              <Layer
                id="water"
                type="fill"
                paint={{
                  "fill-color": "#2140a3",
                  "fill-opacity": 0.5,
                }}
              />
              <Layer
                id="water-outline"
                type="line"
                paint={{
                  "line-color": "#000",
                  "line-width": 1,
                  "line-opacity": 0.4,
                }}
              />
            </Source>
          </Map>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default App;
