// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Risk Analyzer
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Start your risk evaluation journey.
      </Typography>
      <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={() => router.push("/onboarding")}>
          Start Onboarding
        </Button>
        <Button variant="outlined" onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
}
