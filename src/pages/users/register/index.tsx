import * as React from 'react';
import { Box, Button, FormLabel, FormControl, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSubmitRequest } from './actions';
import { FloatingCardContainer, FloatingCard } from '../../../components/Layout/FloatingCards';
import paths from "../../../routes/paths";
import { User } from './types';
export default function SignUp() {

  const {state, sendRequest} = useSubmitRequest()
  const { record_errors } = state?.errors || {}

  const getErrorProps = (fieldName: string) => {
    const error = record_errors?.[fieldName]
    return error ? { error: true, helperText: error.join(', ') } : {}
  }
 
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: use library to convert form data to json
    const data = new FormData(event.currentTarget);
    sendRequest({
      name: data.get('name'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    } as User);
  } 

  return (
    <>
      <FloatingCardContainer direction="column" justifyContent="space-between">
        <FloatingCard variant="outlined">
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
                {...getErrorProps('name')}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
     
                fullWidth
                id="username"
                placeholder="CR7"
                name="username"
                autoComplete="username"
                variant="outlined"
                {...getErrorProps('username')}
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
                {...getErrorProps('email')}
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
                {...getErrorProps('password')}
              />
            </FormControl>
            <Submit />
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?
              <span>
                <Link
                  component={RouterLink}
                  to={paths.LOGIN}
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign in
                </Link>
              </span>
            </Typography>
          </Box>
        </FloatingCard>
      </FloatingCardContainer>
    </>
  );
}

function Submit() {
  const pending  = false

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

// Template source: https://github.com/mui/material-ui/tree/v6.1.1/docs/data/material/getting-started/templates/sign-in