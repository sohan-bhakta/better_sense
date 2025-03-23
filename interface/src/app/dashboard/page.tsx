"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import RiskCharts from "../components/RiskCharts";
import BigNumbers from "../components/BigNumbers";
import ProsConsList from "../components/ProsConsList";
import { ChartData } from "chart.js";
import { useUser } from "@auth0/nextjs-auth0/client";

// Match the shape expected by RiskCharts
interface ChartsData {
  barData: ChartData<"bar">;
  lineData: ChartData<"line">;
  pieData: ChartData<"pie">;
}

interface RiskData {
  pros: string[];
  cons: string[];
  bigNumbers: { label: string; value: number }[];
  chartsData: ChartsData;
}

export default function DashboardPage() {

    const { user, error, isLoading } = useUser();

    

  const [riskData, setRiskData] = useState<RiskData | null>(null);

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const res = await fetch("/api/risk-analysis");
        if (!res.ok) throw new Error("Failed fetching risk data");
        const data: RiskData = await res.json();
        setRiskData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRiskData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!user) return <p>Unauthorized. Please <a href="/api/auth/login">login</a>.</p>;

  if (!riskData) {
    return <Typography>Loading risk data...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
      Welcome, {user.name}, here is your Risk Dashboard
      </Typography>

      <BigNumbers numbers={riskData.bigNumbers} />
      <ProsConsList pros={riskData.pros} cons={riskData.cons} />
      <RiskCharts chartsData={riskData.chartsData} />
    </Box>
  );
}
