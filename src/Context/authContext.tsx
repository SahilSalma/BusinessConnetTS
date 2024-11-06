import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userSignIn, verifyToken } from '../Utils/BackendAPICalls';
import { AuthContextType, User } from '../Types/allTypes';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../Redux/Reducer/User';
import { wait } from '@testing-library/user-event/dist/utils';
import { user as currentUser, userIsLoading, userToken as currentUserToken } from '../Redux/selectors';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = useSelector(currentUser);
  const isLoading = useSelector(userIsLoading);
  const userToken = useSelector(currentUserToken)
  const dispatch = useDispatch();
  
  const login = async (userData: FormData): Promise<boolean> => {
    await dispatch(Actions.fetch.userActions.request({
      email: userData.get('email') as string,
      password: userData.get('password') as string,
    }));

    return userToken !== null;
  };

  const logout = (): void => {
    dispatch(Actions.fetch.logoutUser());
  };

  useEffect(() => {
    if (userToken) {
      dispatch(Actions.fetch.verifyUserActions.request({ token: userToken }));
    }
  }, [userToken]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(Actions.fetch.verifyUserActions.request({token}));
    }
  }, []);
  
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
