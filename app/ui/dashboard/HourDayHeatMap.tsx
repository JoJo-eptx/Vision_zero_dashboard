import React, { useEffect, useState, useMemo } from "react";
import { fetchApiData } from "../../lib/fetchApiData";
import { processMonthlyData } from "../../lib/ProcessMonthlyData";
import type { ButtonHandler } from "../../lib/ChartCardPropTypes";

import { dayTimeEndpoint } from "@/app/lib/endpoints";
import { ChartGridItem } from "@/app/lib/ApexChartType";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HourDayHeatMap() {
  const [rawFeatures, setRawFeatures] = useState<
    { attributes: Record<string, any> }[]
  >([]);

  const [selectedSeverity, setSelectedSeverity] =
    useState<"all" | "fatalities" | "serious">("all");

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    fetchApiData(dayTimeEndpoint).then(setRawFeatures);
  }, []);

  const HOURS = Array.from({ length: 24 }, (_, i) =>
    `time_${String(i).padStart(2, "0")}_00`
  );

  const HOUR_LABELS = HOURS.map(h =>
    h.replace("time_", "").replace("_00", ":00")
  );

  const SEVERITY_MAP: Record<typeof selectedSeverity, string[] | null> = {
    all: null,
    fatalities: ["K"],
    serious: ["A"],
  };

  const availableYears = useMemo<number[]>(() => {
    return Array.from(
      new Set(rawFeatures.map(f => f.attributes.Year))
    ).sort((a, b) => a - b);
  }, [rawFeatures]);

  const filteredFeatures = useMemo(() => {
    return rawFeatures.filter(f => {
      const { Severity, Year } = f.attributes;

      if (selectedYear !== null && Year !== selectedYear) return false;

      const allowed = SEVERITY_MAP[selectedSeverity];
      if (allowed && !allowed.includes(Severity)) return false;

      return true;
    });
  }, [rawFeatures, selectedSeverity, selectedYear]);

  const aggregatedByDay = useMemo(() => {
    const map = new Map<string, Record<string, number>>();

    filteredFeatures.forEach(f => {
      const day = f.attributes.Day_of_Week;

      if (!map.has(day)) map.set(day, {});
      const bucket = map.get(day)!;

      HOURS.forEach(h => {
        bucket[h] = (bucket[h] || 0) + (f.attributes[h] ?? 0);
      });
    });

    return Array.from(map.entries()).map(([day, hours]) => ({
      attributes: { Day_of_Week: day, ...hours },
    }));
  }, [filteredFeatures]);

  const buildSeries = (
    features: { attributes: Record<string, any> }[]
  ) =>
    features.map(f => ({
      name: f.attributes.Day_of_Week,
      data: HOURS.map(h => f.attributes[h] ?? 0),
    }));

  const primaryButtons = [
    { label: "all", fn: () => setSelectedSeverity("all") },
    { label: "fatalities", fn: () => setSelectedSeverity("fatalities") },
    { label: "serious", fn: () => setSelectedSeverity("serious") },
  ];

  const secondaryButtons = [
    { label: "All", fn: () => setSelectedYear(null) },
    ...availableYears.map(year => ({
      label: year.toString(),
      fn: () => setSelectedYear(year),
    })),
  ];

  const chart = {
    title: "By Day & Hour",
    options: {
      chart: { id: "heatmap" },
      xaxis: { categories: HOUR_LABELS },
      colors: ["#002244"], // ✅ single color for ALL series
      plotOptions: {
        heatmap: { shadeIntensity: 0.5 },
      },
      dataLabels: { enabled: true },
    },
    series: buildSeries(aggregatedByDay),
    type: "heatmap",
    primaryButtons,
    secondaryButtons,
  } satisfies ChartGridItem;

  return chart;
}