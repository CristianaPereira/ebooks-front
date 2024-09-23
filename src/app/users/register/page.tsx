"use client"
import * as React from 'react';
import { Box, Button, FormLabel, FormControl, Link, TextField, Typography, Stack } from '@mui/material';
import { Card, SignUpContainer } from './styled';

export default function SignUp() {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await fetch("http://127.0.0.1:8080/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: data.get('name'),
          email: data.get('email'),
          username: data.get('username'),
          password_digest: data.get('password'),
        }
      }),
    }).then((res) => {
      console.log(res);
      console.log("New user createdd");
    });
  };

  return (
    <>
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
              onSubmit={handleSubmit}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign up
              </Button>
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