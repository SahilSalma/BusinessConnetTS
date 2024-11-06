import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { LoadingOverlayProps } from '../Types/allTypes';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, children }) => {
  const overlayStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    zIndex: 20, // Ensure it's above the content
  };

  return (
    <Box position="relative" sx={{ display: 'flex', alignItems: 'center' }}>
      {children}
      {isLoading && (
        <Box sx={overlayStyle}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default LoadingOverlay;
