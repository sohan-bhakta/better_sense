// components/BigNumbers.tsx
"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface BigNumberItem {
  label: string;
  value: number;
}

interface Props {
  numbers: BigNumberItem[];
}

export default function BigNumbers({ numbers }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 4, my: 2 }}>
      {numbers.map((item, index) => (
        <Box key={index} sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">{item.label}</Typography>
          <Typography variant="h3" component="div">{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
}
