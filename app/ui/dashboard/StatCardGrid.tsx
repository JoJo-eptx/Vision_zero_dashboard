"use client";

import React from "react";
import Box from "@mui/material/Box";
import StatCard from "./StatCard";
import { StatCardGridProps } from "../../lib/ApexChartType";

export default function StatCardGrid({ stats }: StatCardGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        flexDirection: "column",
        gap: 4,
        width: "100%",
        py: 0,
        alignItems: "stretch",
        gridTemplateColumns: {
          xs: "1fr",            // 1 column on phones
          sm: "repeat(2, 1fr)", // 2 columns on tablets
          lg: "repeat(6, 1fr)", // 3 columns (single row) on large screens
        },
      }}
    >
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </Box>
  );
}
