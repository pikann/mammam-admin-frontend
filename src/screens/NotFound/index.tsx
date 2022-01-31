import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function NotFoundScreen() {
  const history = useHistory();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        flexGrow: 1,
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Grid container marginTop={'10vh'} justifyContent="center">
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
          }}
          alt="Logo"
          src="https://mammam-bucket-dev.s3.ap-southeast-1.amazonaws.com/logo.png"
        />
      </Grid>
      <Typography component="h1" variant="h1" sx={{fontSize: 128, marginTop: '50px'}} align='center'>
        404
      </Typography>
      <Typography component="h1" variant="h2" align='center'>
        Page not found
      </Typography>
      <Grid container marginTop={'40px'} justifyContent="center">
        <Button variant="contained" onClick={() => history.push('/')}>
          Homepage
        </Button>
      </Grid>
    </Box>
  );
}
