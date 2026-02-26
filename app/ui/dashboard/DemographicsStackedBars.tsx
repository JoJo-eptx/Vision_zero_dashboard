import React, { useEffect, useState, useMemo } from "react";
import { raceBarColors, ageBarColors, sexBarColors } from "@/app/lib/travelModeColors";
import { fetchApiData } from "../../lib/fetchApiData";
import { raceEndpoint, ageEndpoint, sexEndpoint } from "@/app/lib/endpoints";
import type { ButtonHandler } from "../../lib/ChartCardPropTypes";
import { ChartGridItem } from "@/app/lib/ApexChartType";


/* =========================
   API ENDPOINTS
========================= */
const ENDPOINTS = {
  race: raceEndpoint,
  age: ageEndpoint,
  sex: sexEndpoint,
};

type GroupType = "race" | "age" | "sex";
type SeverityType = "all" | "fatalities" | "serious";

/* =========================
   SEVERITY MAP
========================= */
const SEVERITY_MAP: Record<SeverityType, string[] | null> = {
  all: null,
  fatalities: ["K"],
  serious: ["A"],
};

export default function DemographicsStackedBar() {
  const [tables, setTables] = useState<Record<GroupType, any[]>>({
    race: [],
    age: [],
    sex: [],
  });

  const [selectedGroup, setSelectedGroup] = useState<GroupType>("race");
  const [selectedSeverity, setSelectedSeverity] =
    useState<SeverityType>("all");

  /* =========================
     FETCH ALL TABLES ONCE
  ========================= */
  useEffect(() => {
    Promise.all([
      fetchApiData(ENDPOINTS.race),
      fetchApiData(ENDPOINTS.age),
      fetchApiData(ENDPOINTS.sex),
    ]).then(([race, age, sex]) => {
      setTables({ race, age, sex });
    });
  }, []);

  /* =========================
     ACTIVE TABLE
  ========================= */
  const activeTable = tables[selectedGroup];

  /* =========================
     FILTER BY SEVERITY
  ========================= */
  const filtered = useMemo(() => {
    const allowed = SEVERITY_MAP[selectedSeverity];

    return activeTable.filter(f => {
      if (!allowed) return true;
      return allowed.includes(f.attributes.Severity);
    });
  }, [activeTable, selectedSeverity]);

  /* =========================
     CATEGORY FIELDS
  ========================= */
  const categoryFields = useMemo(() => {
    if (!filtered.length) return [];

    return Object.keys(filtered[0].attributes).filter(
      k => !["OBJECTID", "Crash_Year", "Severity"].includes(k)
    );
  }, [filtered]);

  /* =========================
     YEARS (CATEGORY AXIS)
  ========================= */
  const years = useMemo(() => {
    return Array.from(
      new Set(filtered.map(f => Number(f.attributes.Crash_Year)))
    ).sort((a, b) => a - b);
  }, [filtered]);

  /* =========================
     RAW COUNTS PER YEAR
  ========================= */
  const rawCounts = useMemo(() => {
    const map: Record<number, Record<string, number>> = {};

    years.forEach(year => {
      map[year] = {};
      categoryFields.forEach(field => {
        map[year][field] = filtered
          .filter(f => Number(f.attributes.Crash_Year) === year)
          .reduce(
            (sum, f) => sum + (Number(f.attributes[field]) || 0),
            0
          );
      });
    });

    return map;
  }, [years, categoryFields, filtered]);

  /* =========================
     TOTALS PER YEAR
  ========================= */
  const totalsByYear = useMemo(() => {
    const totals: Record<number, number> = {};

    years.forEach(year => {
      totals[year] = Object.values(rawCounts[year]).reduce(
        (sum, v) => sum + v,
        0
      );
    });

    return totals;
  }, [rawCounts, years]);

  /* =========================
     BUILD % STACKED SERIES
  ========================= */
  const series = useMemo(() => {
    return categoryFields.map(field => ({
      name: field.replaceAll("_", " "),
      data: years.map(year => {
        const total = totalsByYear[year];
        const value = rawCounts[year][field] ?? 0;
        return total ? +(value / total * 100).toFixed(2) : 0;
      }),
    }));
  }, [categoryFields, years, rawCounts, totalsByYear]);

    /* =========================
    COLOR MAP
    ========================= */
    const COLOR_MAP: Record<GroupType, string[]> = {
    race: raceBarColors,
    age: ageBarColors,
    sex: sexBarColors,
    };

    /* =========================
    COLORS (MATCH SERIES + GROUP)
    ========================= */
    const colors = useMemo(() => {
    const palette = COLOR_MAP[selectedGroup] ?? [];
    return palette.slice(0, categoryFields.length);
    }, [selectedGroup, categoryFields]);


  /* =========================
     BUTTONS
  ========================= */
  const primaryButtons: ButtonHandler[] = [
    { label: "all", fn: () => setSelectedSeverity("all") },
    { label: "fatalities", fn: () => setSelectedSeverity("fatalities") },
    { label: "serious", fn: () => setSelectedSeverity("serious") },
  ];

  const secondaryButtons: ButtonHandler[] = [
    { label: "Race / Ethnicity", fn: () => setSelectedGroup("race") },
    { label: "Age", fn: () => setSelectedGroup("age") },
    { label: "Sex", fn: () => setSelectedGroup("sex") },
  ];

  /* =========================
     CHART CONFIG
  ========================= */
  const chart = {
    title: "By Demographics",
    type: "bar",
    series,
    primaryButtons,
    secondaryButtons,
    options: {
      chart: {
        stacked: true,
        stackType: "100%", // ✅ 100% STACK
        toolbar: { show: false },
      },
      colors, // ✅ APPLY COLOR SCHEME
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: years.map(String),
        labels: {
          formatter: (val: number) => `${val}%`,
        },
        max: 100,
      },
      tooltip: {
        y: {
          formatter: (value: number, opts: any) => {
            const year = years[opts.dataPointIndex];
            const field = categoryFields[opts.seriesIndex];
            const raw = rawCounts[year][field] ?? 0;
            return `${raw} (${value}%)`;
          },
        },
      },
      legend: {
        position: "top",
      },
      dataLabels: {
        enabled: false,
      },
    },
  } satisfies ChartGridItem;

  return chart;
}