import * as React from 'react';
import { Container, Grid, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import toast from 'toastr';

import * as LoginActions from './store/actions';
import { makeSelectLoading } from './store/selectors';

interface IProp {
  isLoading: boolean;
  login: (payload: any) => void;
}

const LoginScreen = ({
  isLoading,
  login,
}: IProp) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('username')) {
      toast.warning('Enter username!');
      return;
    }
    if (!data.get('password')) {
      toast.warning('Enter password!');
      return;
    }

    login({
      email: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container marginTop={'5vh'} justifyContent="center">
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
          }}
          alt="Logo"
          src="https://mammam-bucket-dev.s3.ap-southeast-1.amazonaws.com/logo.png"
        />
      </Grid>
      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login Admin
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress color='secondary' size={25} /> : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector<any, any>({
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (payload: any) => dispatch(LoginActions.login.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
