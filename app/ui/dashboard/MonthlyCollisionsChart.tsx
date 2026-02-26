import React, { useEffect, useState } from "react";
import { fetchApiData } from "../../lib/fetchApiData";
import { processMonthlyData } from "../../lib/ProcessMonthlyData";
import type { ButtonHandler } from "../../lib/ChartCardPropTypes";

import { 
  travelModeEndpointFatal,
  travelModeEndpointSerious
} from "../../lib/endpoints";
import { ChartGridItem } from "@/app/lib/ApexChartType";


export default function MonthlyCollisionsChart() {
  // Component logic and state management would go here
  // 🔹 State for monthly chart
  const [monthlyCollisions, setMonthlyCollisions] = useState<{
    months: string[];
    avg: number[];
    latest: number[];
  }>({ months: [], avg: [], latest: [] });

  // 🔹 Function: Serious Injuries
  const onMonthlySeriousInjuriesClick = async () => {
    const features = await fetchApiData(
      travelModeEndpointSerious
    );

    const data = processMonthlyData(features);
    setMonthlyCollisions(data);
  };

  // 🔹 Function: Fatal Injuries
  const onMonthlyFatalInjuriesClick = async () => {
    const features = await fetchApiData(
      travelModeEndpointFatal
    );

    const data = processMonthlyData(features);
    setMonthlyCollisions(data);
  };

  const onMonthlyAllInjuriesClick = async () => {
    const serious = await fetchApiData(
      travelModeEndpointSerious
    );
    const fatal = await fetchApiData(
      travelModeEndpointFatal
    );

    if (!serious.length && !fatal.length) return;

    // Use months from serious if exists, otherwise fatal
    const months = serious.length
      ? serious.map((f: { attributes: { C_Crash_Month: any } }) => f.attributes.C_Crash_Month)
      : fatal.map((f: { attributes: { C_Crash_Month: any } }) => f.attributes.C_Crash_Month);

    // Dynamically extract year columns from available data
    const sampleAttributes = serious[0]?.attributes || fatal[0]?.attributes || {};
    const allColumns = Object.keys(sampleAttributes);
    // Filter only the yearly columns (exclude C_Latest_Year_Sum, C_Crash_Month, etc.)
    const yearColumns = allColumns.filter((col) => /^C_\d{4}$/.test(col));
    // Take all except the latest year for averaging
    const prevYears = yearColumns.slice(0, -1);

    // Compute average across previous years for each month
    const avg = months.map((_: any, i: number) => {
      const seriousSum = serious[i]
        ? prevYears.reduce((acc, year) => acc + (serious[i].attributes[year] || 0), 0)
        : 0;
      const fatalSum = fatal[i]
        ? prevYears.reduce((acc, year) => acc + (fatal[i].attributes[year] || 0), 0)
        : 0;
      return Math.round((seriousSum + fatalSum) / prevYears.length);
    });

    // Latest year sum
    const latest = months.map((_: any, i: number) => {
      const seriousLatest = serious[i]?.attributes.C_Latest_Year_Sum || 0;
      const fatalLatest = fatal[i]?.attributes.C_Latest_Year_Sum || 0;
      return seriousLatest + fatalLatest;
    });

    setMonthlyCollisions({ months, avg, latest });
  };

  // 🔹 Fetch initial monthly collisions on mount
  useEffect(() => {
    onMonthlyAllInjuriesClick();
  }, []);

  const primaryButtons = [
    { label: "all", fn: onMonthlyAllInjuriesClick },
    { label: "fatalities", fn: onMonthlyFatalInjuriesClick },
    { label: "serious", fn: onMonthlySeriousInjuriesClick },
  ] satisfies ButtonHandler[];
    
  const chart = {
      title: "By Year & Month",
      options: { 
        chart: { id: "vertical-bar" },
        plotOptions: { bar: { horizontal: false } },
        xaxis: { categories: monthlyCollisions.months },
        dataLabels: { enabled: false },
        colors: ["#003366", "#FF9900"],
      },
      series: [
        { name: "Five Year Average", data: monthlyCollisions.avg },
        { name: "Current Year", data: monthlyCollisions.latest }
      ],
      type: "bar",
      showTable: true,
      primaryButtons: primaryButtons,
    } satisfies ChartGridItem;
    
    return (chart);
}