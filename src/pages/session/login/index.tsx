import * as React from 'react';
import { Box, Button, FormLabel, FormControl, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FloatingCardContainer, FloatingCard } from '../../../components/Layout/FloatingCards';
import paths from '../../../routes/paths';
import axios from 'axios';
import { useSession } from '../../../hooks/session';

export default function SignIn() {
  const { handleLogin, logged_in} = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("session/login", 
      {
        email: data.get('email'),
        password: data.get('password'),
      },
      { withCredentials: true })
      .then((res) => {
        console.log(res); 
        handleLogin(res.data); 
        return res.data 
      }).catch((err) => {
        console.log(err);
      });
    return response;
  
    
 
  };

  if(logged_in) {
    navigate(paths.HOME);
  }

  return (
    <FloatingCardContainer direction="column" justifyContent="space-between">
      <FloatingCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Do not have an account?
            <span>
              <Link
                component={RouterLink}
                to={paths.REGISTER}
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </FloatingCard>
    </FloatingCardContainer>
  );
}