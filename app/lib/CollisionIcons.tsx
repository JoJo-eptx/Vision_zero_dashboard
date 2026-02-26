import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

export const ICON_MAP: Record<string, JSX.Element> = {
  "Total Collisions": <DirectionsCarIcon color="success" />,
  "Fatal Injuries": <MonitorHeartIcon color="error" />,
  "Serious Injuries": <MedicalServicesIcon color="warning" />,
  "Motorcycle Collisions": <TwoWheelerIcon color="success" />,
  "Bicycle Collisions": <DirectionsBikeIcon color="primary" />,
  "Pedestrian Collisions": <DirectionsWalkIcon color="secondary" />,
};
