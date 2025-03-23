// types/DashboardData.ts
export interface PieData {
  id: number;
  value: number;
  label: string;
}

export interface BarSeriesData {
  data: number[];
}

export interface LineSeriesData {
  data: number[];
  area: boolean;
}

export interface DashboardData {
  userName: string;
  betName: number;
  projectedMonthlyIncome: number;
  monthlyExpenses: number;
  dependents: number;
  pros: string[];
  cons: string[];

  // Pie
  pieData: PieData[];

  // Bar (Top 5 features)
  barLabels: string[];
  barLabelName: string;
  barYAxisName: string;
  barSeries: BarSeriesData[];

  // Line
  lineLabels: number[];
  lineXAxisName: string;
  lineYAxisName: string;
  lineSeries: LineSeriesData[];
}
