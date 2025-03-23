"use client";
import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

interface BigNumbersProps {
  projectedMonthlyIncome: number;
  monthlyExpenses: number;
  dependents: number;
}

export default function BigNumbers(props: BigNumbersProps) {
  const theme = useTheme();
  const { projectedMonthlyIncome, monthlyExpenses, dependents } = props;

  return (
    <Box sx={{ display: "flex", height: "100%", gap: 2 }}>
      <Paper
        elevation={3}
        sx={{
          width: "375px",
          height: "100%",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column", 
          // Removed 'justifyContent: "center"' so the title stays at the top
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, mt: 1 }}>
          Financial Summary
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          ${projectedMonthlyIncome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Projected Monthly Income
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.error.main }}>
          ${monthlyExpenses}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monthly Revolving Payments (Expenses)
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.error.main }}>
          {dependents}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Dependents
        </Typography>
      </Paper>
    </Box>
  );
}
