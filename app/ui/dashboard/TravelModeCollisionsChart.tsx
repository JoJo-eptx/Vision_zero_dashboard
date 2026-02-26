import React, { useEffect, useState } from "react";
import { fetchApiData } from "../../lib/fetchApiData";
import { processTravelModeData } from "@/app/lib/ProcessTravelModeData";
import { extractYearColumns } from "@/app/lib/extractYearColumns";
import { travelModeColors } from "@/app/lib/travelModeColors";
import { ChartGridItem } from "@/app/lib/ApexChartType";

import { 
  personTypeEndpointFatal, 
  personTypeEndpointSerious,
} from "../../lib/endpoints";
import { ButtonHandler } from "@/app/lib/ChartCardPropTypes";


export default function TravelModeCollisionsChart() {

  // 🔹 State for stacked chart
  const [travelModeData, setTravelModeData] = useState<{
    years: string[]; // x-axis categories
    groups: Record<string, number[]>; // dynamic C_Group stacks
    series: { name: string; data: number[] }[]; // apex-ready series
  }>({
    years: [],
    groups: {},
    series: [],
  });

  const onTravelModeSeriousClick = async () => {
    const features = await fetchApiData(
      personTypeEndpointSerious
    );
    const processed = processTravelModeData(features);
    setTravelModeData({
      years: processed.categories,
      groups: {}, // or build groups if needed
      series: processed.series,
    });
  };

  const onTravelModeFatalClick = async () => {
    const features = await fetchApiData(
      personTypeEndpointFatal
    );
    const processed = processTravelModeData(features);
    setTravelModeData({
      years: processed.categories,
      groups: {},
      series: processed.series,
    });
  };

  const onTravelModeAllClick = async () => {
    const serious = await fetchApiData(personTypeEndpointSerious);
    const fatal = await fetchApiData(personTypeEndpointFatal);

    if (!serious.length && !fatal.length) return;

    // 🔹 Year columns: ["C_2020", "C_2021", ...]
    const yearCols = extractYearColumns([...serious, ...fatal]);

    // 🔹 Index both pivot tables by group
    const seriousByGroup = Object.fromEntries(
      serious.map((r: { attributes: { C_Group: any; }; }) => [r.attributes.C_Group, r.attributes])
    );

    const fatalByGroup = Object.fromEntries(
      fatal.map((r: { attributes: { C_Group: any; }; }) => [r.attributes.C_Group, r.attributes])
    );

    // 🔹 Union + SORT groups
    const allGroups = Array.from(
      new Set([
        ...Object.keys(seriousByGroup),
        ...Object.keys(fatalByGroup),
      ])
    ).sort();

    // 🔹 Cell-wise sum: (group × year)
    const combinedFeatures = allGroups.map(group => {
      const s = seriousByGroup[group] ?? {};
      const f = fatalByGroup[group] ?? {};

      const summedYears = yearCols.reduce<Record<string, number>>(
        (acc, y) => {
          acc[y] = (Number(s[y]) || 0) + (Number(f[y]) || 0);
          return acc;
        },
        {}
      );

      return {
        attributes: {
          C_Group: group,
          ...summedYears,
        },
      };
    });

    // 🔹 Let existing logic handle chart/table shaping
    const processed = processTravelModeData(combinedFeatures);

    setTravelModeData({
      years: processed.categories,
      groups: {},
      series: processed.series,
    });
  };

  // 🔹 Optionally fetch default on mount
  useEffect(() => {
    onTravelModeAllClick();
  }, []);

  const primaryButtons = [
    { label: "all", fn: onTravelModeAllClick },
    { label: "fatalities", fn: onTravelModeFatalClick },
    { label: "serious", fn: onTravelModeSeriousClick },
  ] satisfies ButtonHandler[];
  
  const chart = 
    {
      title: "By Travel Mode",
      options: {
        chart: { id: "stacked-bar", stacked: true },
        xaxis: { categories: travelModeData.years },
        plotOptions: { bar: { horizontal: true } },
        dataLabels: { enabled: false },
        colors: travelModeColors, // dark blue + orange
      },
      series: travelModeData.series,
      type: "bar",
      showTable: true,
      primaryButtons: primaryButtons,
    } satisfies ChartGridItem;

    return (chart);
}