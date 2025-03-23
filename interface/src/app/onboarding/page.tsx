"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";

export default function OnboardingPage() {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    occupation: "",
    education: "",
    maritalStatus: "",
    dependents: "",
    location: "",
    hobbies: "",
    gamblingHistory: "",
  });

  const steps = [
    ["name", "age", "income", "occupation"],
    ["education", "maritalStatus", "dependents", "location"],
    ["hobbies", "gamblingHistory"],
  ];

  const labels: Record<string, string> = {
    name: "Name",
    age: "Age",
    income: "Income",
    occupation: "Occupation",
    education: "Education",
    maritalStatus: "Marital Status",
    dependents: "Number of Dependents",
    location: "Location",
    hobbies: "Hobbies",
    gamblingHistory: "Gambling History (briefly describe)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Request failed");

      setCurrentStep(steps.length);
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
  };

  const isFinalStep = currentStep === steps.length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          component="img"
          src="https://email-image.nyc3.cdn.digitaloceanspaces.com/betterSenselogo2.jpg"
          alt="Onboarding Illustration"
          sx={{
            width: "100%",
            height: "60px",
            objectFit: "contain",
            mb: 2,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h4"
          align="center"
          sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
        >
          {isFinalStep ? "🎉 You're All Set!" : "BetterSense"}
        </Typography>
      </Box>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          width: "500px",
          height: "500px",
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {isFinalStep ? (
  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
    <Box
      component="img"
      src="./invest_2.png"
      alt="Onboarding Illustration"
      sx={{
        width: 60,
        height: 60,
        objectFit: "contain",
        borderRadius: 2,
      }}
    />
    <Typography
      variant="h6"
      align="center"
      sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
    >
      🎉 You&apos;re All Set!
    </Typography>
  </Box>
) : (
  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
    <Box
      component="img"
      src="./invest_4.png"
      alt="Onboarding Illustration"
      sx={{
        width: 60,
        height: 60,
        objectFit: "contain",
        borderRadius: 2,
      }}
    />
    <Typography
      variant="h6"
      align="left"
      sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}
    >
      Let&apos;s start by your putting financial information.
    </Typography>
  </Box>
)}

        {!isFinalStep ? (
          <>
            {steps[currentStep].map((field) => (
              <TextField
                key={field}
                label={labels[field]}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                required
                type={field === "age" || field === "income" ? "number" : "text"}
              />
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        ) : (
          <Typography textAlign="center" mt={4} color="text.secondary">
            Thank you for providing your information. You’ll be redirected to
            your dashboard soon!
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
