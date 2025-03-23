"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";

// 1) Import `useRouter` from Next.js
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const theme = useTheme();
  const router = useRouter(); // 2) Initialize the router
  const [currentStep, setCurrentStep] = useState(0);

  // Updated form data with name, dependents, monthlySpending, etc.
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    monthlySpending: "",
    savings: "",
    debt: "",
    assets: "",
    networth: "",
    mortgage: "",
    dependents: "",
    gamblingFrequency: "",
    gamblingHistory: "",
  });

  // 3 steps, 4 fields per step
  const steps = [
    // Step 1
    ["name", "age", "income", "monthlySpending"],
    // Step 2
    ["savings", "debt", "assets", "networth"],
    // Step 3
    ["mortgage", "dependents", "gamblingFrequency", "gamblingHistory"],
  ];

  // Update the labels to match your new fields
  const labels: Record<string, string> = {
    name: "Full Name",
    age: "Age",
    income: "Monthly Income",
    monthlySpending: "Monthly Spending",
    savings: "Savings",
    debt: "Debt",
    assets: "Assets",
    networth: "Net Worth",
    mortgage: "Mortgage",
    dependents: "Number of Dependents",
    gamblingFrequency: "How Often Do You Gamble?",
    gamblingHistory: "Gambling History (briefly describe)",
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Move to next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Move back to previous step
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Request failed");

      // Step is now beyond the final step, 
      // which triggers our success message + redirect.
      setCurrentStep(steps.length);
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
  };

  const isFinalStep = currentStep === steps.length;

  // 3) Redirect to /dashboard after a short delay
  useEffect(() => {
    if (isFinalStep) {
      // Show the success message for 2 seconds, then redirect
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

      // Cleanup the timer if the component unmounts 
      // or user somehow navigates away
      return () => clearTimeout(timer);
    }
  }, [isFinalStep, router]);

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
      {/* Header with Logo */}
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

      {/* Form Paper */}
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
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}
          >
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
              <br />
              (Redirecting to Dashboard...)
            </Typography>
          </Box>
        ) : (
          // If not final step, show the form fields
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
              Let&apos;s start by putting in your financial information.
            </Typography>
          </Box>
        )}

        {/* Step Fields */}
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
                // numeric fields
                type={
                  [
                    "age",
                    "income",
                    "monthlySpending",
                    "savings",
                    "debt",
                    "assets",
                    "networth",
                    "mortgage",
                    "dependents",
                  ].includes(field)
                    ? "number"
                    : "text"
                }
              />
            ))}

            {/* Buttons: Back / Next or Submit */}
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
                <Button variant="contained" onClick={handleNext} color="primary">
                  Next
                </Button>
              )}
            </Box>
          </>
        ) : (
          <Typography textAlign="center" mt={4} color="text.secondary">
            Thank you for providing your information.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
