import { extractYearColumns } from "./extractYearColumns";

// lib/processTravelModeData.ts
export function processTravelModeData(features: any[]) {
  if (!features.length) return { categories: [], series: [] };

  // Dynamically detect year columns
  const yearColumns = extractYearColumns(features);

  // Build series (unsorted)
  const series = features.map((f) => ({
    name: f.attributes.C_Group,
    data: yearColumns.map((y) => f.attributes[y] ?? 0),
  }));

  // Strip the "C_" prefix for chart categories
  const categories = yearColumns.map((y) => y.replace(/^C_/, ""));

  // 🔹 SORT SERIES alphabetically by Group name (right before return)
  const sortedSeries = [...series].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return { categories, series: sortedSeries };
}
