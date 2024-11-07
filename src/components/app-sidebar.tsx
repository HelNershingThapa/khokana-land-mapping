import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";

const layers = [
  {
    id: "road",
    label: "Road",
  },
  {
    id: "boundaries",
    label: "Boundaries",
  },
  {
    id: "community",
    label: "Community Center",
  },
  {
    id: "museum",
    label: "Museum",
  },
  {
    id: "art",
    label: "Art",
  },
  {
    id: "water",
    label: "Water",
  },
];

interface AppSidebarProps {
  activeLayerIds: string[];
  handleCheckedChange: (layerId: string) => void;
}

export function AppSidebar({
  activeLayerIds,
  handleCheckedChange,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Khokana Land Mapping
          </h3>
          <Separator className="mt-2 mb-3" />
          <Label className="text-base">Layers</Label>
          <p className="text-muted-foreground text-[0.8rem] mt-0.5">
            Select the layers you want to display on the map.
          </p>
          <div className="space-y-2 mt-4">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center space-x-2">
                <Checkbox
                  id={layer.id}
                  checked={activeLayerIds.includes(layer.id)}
                  onCheckedChange={() => handleCheckedChange(layer.id)}
                />
                <Label
                  htmlFor={layer.id}
                  id={layer.id}
                  className="text-sm font-normal"
                >
                  {layer.label}
                </Label>
              </div>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
