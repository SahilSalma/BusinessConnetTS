import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../CommonComponents/ResponsiveAppBar';
import { useAuth } from '../Context/authContext';
import Spinner from '../CommonComponents/Spinner';
import { AuthenticatedLayoutProps } from '../Types/allTypes';

const UnauthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <Spinner isLoading={false} />;
  }

  return (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
    </>
  );
};

export default UnauthenticatedLayout;
