import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function DashboardScreen() {
  return (
    <Box
      component="main"
      sx={{
        marginTop: '64px',
        backgroundColor: (theme) => theme.palette.grey[100],
        flexGrow: 1,
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
    </Box>
  );
}
