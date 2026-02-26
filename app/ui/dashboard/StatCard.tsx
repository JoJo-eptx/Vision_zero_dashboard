"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { StatCardProps } from "../../lib/ApexChartType";


export default function StatCard({ title, value, subtitle, icon, link }: StatCardProps) {
  const cardContent = (
    <Card sx={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent>
        <Typography variant="h3" fontWeight={300}>
          {value}
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mt={1}>
          {icon && <Box sx={{ "& svg": { fontSize: 60 } }}>{icon}</Box>}
          <Box>
              <Typography variant="body1">{title}</Typography>
              <Typography variant="body1" color="text.secondary">{subtitle}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return link ? (
    <Link href={link} style={{ textDecoration: "none" }}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
