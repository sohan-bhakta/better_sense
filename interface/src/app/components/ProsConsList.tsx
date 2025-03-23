// components/ProsConsList.tsx
"use client";

import React from "react";
import { Box, Typography, List, ListItem } from "@mui/material";

interface Props {
  pros: string[];
  cons: string[];
}

export default function ProsConsList({ pros, cons }: Props) {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5">Pros</Typography>
      <List>
        {pros.map((pro, i) => (
          <ListItem key={i}>{pro}</ListItem>
        ))}
      </List>
      <Typography variant="h5">Cons</Typography>
      <List>
        {cons.map((con, i) => (
          <ListItem key={i}>{con}</ListItem>
        ))}
      </List>
    </Box>
  );
}
