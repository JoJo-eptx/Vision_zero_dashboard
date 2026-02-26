import { ApexChartType} from "./ApexChartType";

export type ButtonHandler = {
  label: string;
  fn: () => void;
};

export type ChartCardProps = {
  title: string;
  options: any;
  series: any;
  type: ApexChartType;
  height?: number;
  showTable?: boolean;
  primaryButtons: ButtonHandler[];
  secondaryButtons?: ButtonHandler[];
};

export type ChartCardPropsEx = {
  title: string;
  options: any;
  series: any;
  type: ApexChartType;
  height?: number;
  showTable?: boolean;

  onAllClick?: () => void;
  onFatalitiesClick?: () => void;
  onSeriousInjuriesClick?: () => void;
  
};