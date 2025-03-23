"use client";
import React from "react";
import {
  Box,
  Chip,
  Typography,
  Paper,
  useTheme,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
}

export default function ProsConsList({ pros, cons }: ProsConsListProps) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "758px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2 }}>
          Risk Assessment Summary
        </Typography>

        {/* PROS */}
        <Box sx={{ mb: 3 }}>
          <Chip
            label="Pros"
            icon={<CheckCircleIcon />}
            color="success"
            sx={{ mb: 1 }}
          />
          <Stack spacing={1} pl={2}>
            {pros.map((pro, index) => (
              <Typography key={index} variant="body1">
                • {pro}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* CONS */}
        <Box>
          <Chip
            label="Cons"
            icon={<CancelIcon />}
            color="error"
            sx={{ mb: 1 }}
          />
          <Stack spacing={1} pl={2}>
            {cons.map((con, index) => (
              <Typography key={index} variant="body1">
                • {con}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}