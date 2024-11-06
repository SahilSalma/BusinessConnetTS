import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { LoadingOverlayProps } from '../Types/allTypes';

function Spinner({ isLoading, children }: LoadingOverlayProps) {
  if (children === undefined) {
    children = <Box sx={{ height: '100vh' }} />;
  }
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 2,
  };

  return (
    <Box position="relative">
      {children}
      {isLoading && (
        <Box sx={overlayStyle}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default Spinner;
