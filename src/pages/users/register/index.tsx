'use client'
// import { useFormStatus, useFormState } from "react-dom";
import { Box, Button, FormLabel, FormControl, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// import { NotificationContainer } from 'react-notifications';
import { handleSubmit as formAction } from './actions';
import { FloatingCardContainer, FloatingCard } from '../../../components/Layout/FloatingCards';
import paths from "../../../routes/paths";
export default function SignUp() {
  // const res =  useFormState(handleSubmit, {})
  // const [state, formAction] = res
 

  return (
    <>
      {/*  TODO: move to a global place to keep it DRY ? */}
      {/* <NotificationContainer /> */}
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
            action={formAction}
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