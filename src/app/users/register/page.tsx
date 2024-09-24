"use client"
import * as React from 'react';
import { useFormStatus } from "react-dom";
import { Box, Button, FormLabel, FormControl, Link, TextField, Typography, Stack } from '@mui/material';
import { Card, SignUpContainer } from './styled';
import { NotificationContainer } from 'react-notifications';
import { handleSubmit } from './actions';
export default function SignUp() {

  return (
    <>
      {/*  TODO: move to a global place to keep it DRY ? */}
      <NotificationContainer />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100dvh',
            p: 2,
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              action={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="username"
                  placeholder="CR7"
                  name="username"
                  autoComplete="username"
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                />
              </FormControl>
              <Submit />
              <Typography sx={{ textAlign: 'center' }}>
                Already have an account?
                <span>
                  <Link
                    href="/session/login"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
} 