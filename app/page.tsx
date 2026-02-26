"use client";

import Box from "@mui/material/Box";
import ChartGrid from "./ui/dashboard/ChartGrid";

import { ChartGridItem } from "./lib/ApexChartType";
import MonthlyCollisionsChart from "./ui/dashboard/MonthlyCollisionsChart";
import TravelModeCollisionsChart from "./ui/dashboard/TravelModeCollisionsChart";
import HourDayHeatMap from "./ui/dashboard/HourDayHeatMap";
import DemographicsStackedBar from "./ui/dashboard/DemographicsStackedBars";
import { useStats } from "./ui/dashboard/StatsCards";

export default function Page() {
  const statsCards = useStats();
  const monthlyCollisionsChart = MonthlyCollisionsChart();
  const travelModeCollisionsChart = TravelModeCollisionsChart();
  const hourDayHeatMap = HourDayHeatMap();
  const demographicsStackedBar = DemographicsStackedBar();

  const charts: ChartGridItem[] = [
    monthlyCollisionsChart,
    travelModeCollisionsChart,
    hourDayHeatMap,
    demographicsStackedBar,
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          py: 0,
          px: { xs: 1.5, sm: 2, md: 3 }, // responsive padding
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Centered Content Container */}
        <Box sx={{ width: "100%", maxWidth: "1900px" }}>
          
          {/* Stats Cards */}
          { statsCards }

          {/* Charts */}
          <Box sx={{ width: "100%", py: 4 }}>
            <ChartGrid charts={charts} />
          </Box>

        </Box>
      </Box>
    </main>
  );
}