// components/AuthButtons.tsx
"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Box } from "@mui/material";

export default function AuthButtons() {
  const { user } = useUser();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      {user ? (
        <>
          <span>Hello, {user.name}</span>
          <Button href="/api/auth/logout" variant="outlined">Logout</Button>
        </>
      ) : (
        <Button href="/api/auth/login" variant="contained">Login</Button>
      )}
    </Box>
  );
}
