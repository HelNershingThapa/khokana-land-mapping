import { useMap } from "react-map-gl/maplibre";
import communityIcon from "@/assets/map-markers/community.png";
import templeIcon from "@/assets/map-markers/temple.png";
import museumIcon from "@/assets/map-markers/museum.png";

export function MapImage() {
  const { current: map } = useMap();

  if (!map?.hasImage("community")) {
    map?.loadImage(communityIcon).then(({ data }) => {
      if (!map?.hasImage("community")) map?.addImage("community", data);
    });
  }

  if (!map?.hasImage("temple-icon")) {
    map?.loadImage(templeIcon).then(({ data }) => {
      if (!map?.hasImage("temple-icon")) map?.addImage("temple-icon", data);
    });
  }

  if (!map?.hasImage("museum-icon")) {
    map?.loadImage(museumIcon).then(({ data }) => {
      if (!map?.hasImage("museum-icon")) map?.addImage("museum-icon", data);
    });
  }

  return null;
}
