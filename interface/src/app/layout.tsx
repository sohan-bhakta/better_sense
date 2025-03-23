// app/layout.tsx
"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const theme = createTheme({
  // Customize your MUI theme here as needed
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
        <UserProvider>
          {children}
          </UserProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
