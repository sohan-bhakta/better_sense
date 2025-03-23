"use client";

import React from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  PieData,
  BarSeriesData,
  LineSeriesData
} from "../types/dashboardData";

interface RiskChartsProps {
  pieData: PieData[];
  barLabels: string[];
  barLabelName: string;
  barYAxisName: string;
  barSeries: BarSeriesData[];
  lineLabels: number[];
  lineXAxisName: string;
  lineYAxisName: string;
  lineSeries: LineSeriesData[];
}

export default function RiskCharts({
  pieData,
  barLabels,
  barLabelName,
  barYAxisName,
  barSeries,
  lineLabels,
  lineXAxisName,
  lineYAxisName,
  lineSeries,
}: RiskChartsProps) {
  const theme = useTheme();

  function BasicPie() {
    return (
      <PieChart
        series={[
          {
            data: pieData,
          },
        ]}
        width={360}
        height={215}
      />
    );
  }

  function BasicBars() {
    // The bar chart with 5 bars
    return (
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: barLabels,
            label: barLabelName,
          },
        ]}
        yAxis={[
          {
            position: "left",
            label: barYAxisName,
          },
        ]}
        series={barSeries}
        width={375}
        height={250}
      />
    );
  }

  function BasicLineChart() {
    return (
      <LineChart
        xAxis={[
          {
            data: lineLabels,
            label: lineXAxisName,
          },
        ]}
        yAxis={[
          {
            position: "left",
            label: lineYAxisName,
          },
        ]}
        series={lineSeries}
        width={375}
        height={250}
      />
    );
  }

  const chartConfigs = [
    { title: "Monthly Income (Pie Chart)", component: <BasicPie /> },
    {
      title: "Highest Risk Factors (Top 5)",
      component: <BasicBars />,
    },
    { title: "Projected Risk Range (Line Chart)", component: <BasicLineChart /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {chartConfigs.map(({ title, component }) => (
        <Paper
          key={title}
          elevation={3}
          sx={{
            p: 1,
            width: 375,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, mb: 1, ml: 5 }}
          >
            {title}
          </Typography>
          {component}
        </Paper>
      ))}
    </Box>
  );
}
