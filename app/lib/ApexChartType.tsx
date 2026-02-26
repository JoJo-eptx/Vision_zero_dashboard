import type { ButtonHandler } from "./ChartCardPropTypes";

// types.ts
export type ApexChartType =
  | "bar"
  | "line"
  | "heatmap"
  | "area"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap"
  | undefined;

export type ChartGridItem = {
  title: string;
  options: any;
  series: any;
  type: ApexChartType;
  showTable?: boolean;
  // Optional callbacks for ChartCard buttons
  primaryButtons: ButtonHandler[];
  secondaryButtons?: ButtonHandler[];
};

export type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  link?: string;
};

export type Stat = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  link?: string;
};

export type StatCardGridProps = {
  stats: Stat[];
};
