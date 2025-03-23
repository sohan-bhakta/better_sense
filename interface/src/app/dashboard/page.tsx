"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DashboardData } from "../types/dashboardData"; // Path to your interface
import RiskCharts from "../components/RiskCharts";
import BigNumbers from "../components/BigNumbers";
import ProsConsList from "../components/ProsConsList";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Fetch from your Python backend
    // e.g., fetch("http://localhost:8000/api/dashboard-data")
    fetch("http://127.0.0.1:8000/api/dashboard-data")
      .then((res) => res.json())
      .then((json: DashboardData) => {
        setData(json);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    // Optionally show a loading state
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        sx={{ ml: "50px", mb: 2, color: "primary.main", fontWeight: 600 }}
      >
        Welcome {data.userName}, here is a better sense of your risk and wealth.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 1,
          mb: "8px",
          height: "400px",
          alignItems: "stretch",
        }}
      >
        {/* Pass big number data to BigNumbers */}
        <BigNumbers
          projectedMonthlyIncome={data.projectedMonthlyIncome}
          monthlyExpenses={data.monthlyExpenses}
          dependents={data.dependents}
        />

        {/* Pass pros and cons data to ProsConsList */}
        <ProsConsList pros={data.pros} cons={data.cons} />
      </Box>

      {/* Pass chart data to RiskCharts */}
      <RiskCharts
        pieData={data.pieData}
        barLabels={data.barLabels}
        barLabelName={data.barLabelName}
        barYAxisName={data.barYAxisName}
        barSeries={data.barSeries}
        lineLabels={data.lineLabels}
        lineXAxisName={data.lineXAxisName}
        lineYAxisName={data.lineYAxisName}
        lineSeries={data.lineSeries}
      />
    </Box>
  );
}