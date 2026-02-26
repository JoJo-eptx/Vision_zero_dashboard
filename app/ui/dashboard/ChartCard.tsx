"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ChartCardProps } from "../../lib/ChartCardPropTypes";
import { buttonStyles } from "./buttonStyles";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function buildButton(
  label: any,
  onClick: (() => void) | undefined,
  selected: any,
  setSelected: React.Dispatch<React.SetStateAction<any>>
) {
  return (
    <Button
      size="small"
      variant="contained"
      sx={buttonStyles(selected === label)}
      onClick={() => { setSelected(label); onClick?.(); }}
    >
      {label}
    </Button>
  );
}

export default function ChartCard({
  title,
  options,
  series,
  type,
  height = 400,
  primaryButtons,
  secondaryButtons,
  showTable = false, // new prop
}: ChartCardProps & { showTable?: boolean }) {

  const [selected, setSelected] = useState<"all" | "fatalities" | "serious" | null>("all");
  const [selectedSecondary, setSelectedSecondary] = useState<string | null>(null);

  // Extract categories for table (assumes options.xaxis.categories exists)
  const categories: string[] = options?.xaxis?.categories || [];

  // Reduce chart height if table is shown
  const chartHeight = showTable ? height * 0.6 : height;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        p: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.62)",
        },
      }}
    >
      {/* Header & Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="left" mb={2}>
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>

        <Stack direction="row" spacing={2}>
          {(primaryButtons ?? []).map(({ label, fn }) => (
            <React.Fragment key={label}>
              {buildButton(label, fn, selected, setSelected)}
            </React.Fragment>
          ))}
        </Stack>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 2 }} />

      {/* Secondary Buttons */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        {(secondaryButtons?.length ?? 0) > 0 && (
          <Stack direction="row" spacing={1} mb={2}>
            {secondaryButtons!.map(({ label, fn }) => (
              <React.Fragment key={label}>
                {buildButton(label, fn, selectedSecondary, setSelectedSecondary)}
              </React.Fragment>
            ))}
          </Stack>
        )}
        </Box>

      {/* Divider */}
      <Divider sx={{ my: 0 }} />

      {/* Optional table first */}
      {showTable && series.length > 0 && categories.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><b>Group / Year</b></TableCell>
                {categories.map((cat) => (
                  <TableCell key={cat} align="right"><b>{cat}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {series.map((s: any) => (
                <TableRow key={s.name}>
                  <TableCell>{s.name}</TableCell>
                  {s.data.map((val: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, i: React.Key | null | undefined) => (
                    <TableCell key={i} align="right">{val}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Chart */}
      <Chart
        options={options}
        series={series}
        type={type}
        height={chartHeight}
        width="100%"
      />
    </Box>
  );
}
