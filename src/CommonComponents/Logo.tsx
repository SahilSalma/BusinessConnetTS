import React from 'react';
import logo from '../Assets/Logo.png';

const Logo: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
    </>
  );
};

export default Logo;
