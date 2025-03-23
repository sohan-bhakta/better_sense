"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  ChartData,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

// Define expected shape of chartsData
interface ChartsData {
  barData: ChartData<"bar">;
  lineData: ChartData<"line">;
  pieData: ChartData<"pie">;
}

interface Props {
  chartsData: ChartsData;
}

export default function RiskCharts({ chartsData }: Props) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Risk Charts
      </Typography>

      {/* Bar Chart */}
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Bar Chart</Typography>
        <Bar data={chartsData.barData} />
      </Box>

      {/* Line Chart */}
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Line Chart</Typography>
        <Line data={chartsData.lineData} />
      </Box>

      {/* Pie Chart */}
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Pie Chart</Typography>
        <Pie data={chartsData.pieData} />
      </Box>
    </Box>
  );
}

// ✅ Example mock data for testing/demo usage
const mockData: ChartsData = {
  barData: {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Dataset 1",
        data: [30, 50, 20],
        backgroundColor: "rgba(75,192,192,0.4)",
      },
    ],
  },
  lineData: {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Risk Over Time",
        data: [10, 40, 20, 60],
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        tension: 0.3,
      },
    ],
  },
  pieData: {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [30, 20, 50],
        backgroundColor: ["red", "orange", "green"],
      },
    ],
  },
};

// ✅ Optional exportable wrapper for direct use on a page
export function DemoRiskCharts() {
  return <RiskCharts chartsData={mockData} />;
}
