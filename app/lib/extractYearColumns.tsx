// lib/extractYearColumns.ts
export function extractYearColumns(features: any[]): string[] {
  const yearColumns = new Set<string>();

  features.forEach((f) => {
    Object.keys(f.attributes)
      .filter((key) => /^C_\d{4}$/.test(key)) // match columns like C_2020, C_2021...
      .forEach((key) => yearColumns.add(key));
  });

  return Array.from(yearColumns).sort(); // chronological order
}
