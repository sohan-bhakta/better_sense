"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function OnboardingPage() {
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
      const response = await fetch("/api/user-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Request failed");
      setCurrentStep(steps.length); // go to final screen
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    }
  };

  const isFinalStep = currentStep === steps.length;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        margin: "auto",
        mt: 6,
        px: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        {isFinalStep ? "🎉 You're All Set!" : "Onboarding"}
      </Typography>

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

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Typography textAlign="center" mt={4}>
          Thank you for providing your information. You’ll be redirected to your dashboard soon!
        </Typography>
      )}
    </Box>
  );
}
