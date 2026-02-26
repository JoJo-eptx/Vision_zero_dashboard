import { extractYearColumns } from "./extractYearColumns";

// lib/processMonthlyData.ts
export function processMonthlyData(features: any[]) {
  if (!features.length) return { months: [], latest: [], avg: [] };

  // Dynamically detect year columns, e.g., C_2020, C_2021, etc.
  const yearColumns = extractYearColumns(features);

  // Assume latest year is the last column
  const latestYearColumn = yearColumns[yearColumns.length - 1];
  const prevYears = yearColumns.slice(0, -1);

  const months = features.map((f) => f.attributes.C_Crash_Month);

  const latest = features.map((f) => Math.round(f.attributes[latestYearColumn] ?? 0));

  const avg = features.map((f) => {
    const total = prevYears.reduce((acc, y) => acc + (f.attributes[y] ?? 0), 0);
    return Math.round(total / prevYears.length);
  });

  return { months, latest, avg };
}
