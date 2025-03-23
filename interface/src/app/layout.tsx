"use client";

import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#04453c",
    },
    secondary: {
      main: "#65b79a",
    },
    background: {
      default: "#dddddd",
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h6: {
      fontWeight: 600,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline /> 
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
