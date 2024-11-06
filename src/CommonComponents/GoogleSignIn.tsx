// GoogleSignIn.tsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleSignIn: React.FC = () => {
  const onSuccess = (credentialResponse: any) => {
    console.log('Login Success: current user:', credentialResponse);
  };

  const onFailure = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <GoogleLogin 
        onSuccess={onSuccess}
        onError={onFailure}
      />
    </div>
  );
};

export default GoogleSignIn;
