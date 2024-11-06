import React from 'react';
import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../Context/themeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <>
    <LightModeIcon onClick={isDarkMode ? toggleTheme: ()=>{}}/>
    <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        color="default"
      />
    <DarkModeIcon onClick={!isDarkMode ? toggleTheme: ()=>{}}/>
    </>
  );
};

export default ThemeToggle;
