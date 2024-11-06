import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1F2937',
    },
    primary: {
      main: '#0A2BC1',
      contrastText: '#FABD2F',
    },
    secondary: {
      main: '#BAC1D6',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
      disabled: '#D9D9D9',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#0A2BC1',
      contrastText: '#FABD2F',
    },
    secondary: {
      main: '#6B7280',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
  },
});
