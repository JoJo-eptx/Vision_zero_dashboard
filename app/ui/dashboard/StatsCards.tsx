import { useEffect, useState } from "react";
import { Stat } from "../../lib/ApexChartType";
import { ICON_MAP } from "../../lib/CollisionIcons";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StatCardGrid from "./StatCardGrid";

import { statsEndpoint } from "../../lib/endpoints";

export function useStats() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(statsEndpoint);
        const data = await res.json();

        if (!data.features || data.features.length === 0) return;

        const mappedStats: Stat[] = data.features.map((f: any) => ({
          title: f.attributes.Statistic,
          value: f.attributes.Value.toLocaleString(),
          subtitle: "since 2020",
          icon: ICON_MAP[f.attributes.Statistic] || <DirectionsCarIcon />,
        }));

        setStats(mappedStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (<StatCardGrid stats={stats} />);
}