"use client";

import React from "react";
import Box from "@mui/material/Box";
import ChartCard from "./ChartCard";
import { ApexChartType, ChartGridItem } from "../../lib/ApexChartType";



type ChartGridProps = {
  charts: ChartGridItem[];
};

export default function ChartGrid({ charts }: ChartGridProps) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1900px",
        margin: "0 auto",
        display: "grid",
        gap: 4,
        alignItems: "stretch",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr", // single column on small tablets
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        },
      }}
    >
      {charts.map((chart, i) => (
        <ChartCard key={i} {...chart} />
      ))}
    </Box>
  );
}
