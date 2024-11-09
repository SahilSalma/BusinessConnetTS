import React, { ReactNode, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import ResponsiveAppBar from './CommonComponents/ResponsiveAppBar';
import { AuthContextProvider } from './Context/authContext';
import Home from './Pages/Home';
import Listing from './Pages/Listing';
import ListHere from './Pages/ListHere';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import SignUp from './Pages/SignUp';
import ProfilePage from './Pages/ProfilePage';
import AccountSetting from './Pages/AccountSetting';
import DisplayBusiness from './Pages/DisplayBusiness';
import { useTheme } from '@mui/material/styles';
import EditBusiness from './Pages/EditBusiness';
import AuthenticatedLayout from './CommonComponents/AuthenticatedLayout';
import Unauthorized from './CommonComponents/Unauthorized';
import NotFound from './CommonComponents/NotFound';
import NewPassword from './Components/NewPassword';
import Chat from './Components/Chat';
import ViewPost from './Components/ViewPost';
import ComingSoonPage from './CommonComponents/ComingSoon';

const App: React.FC = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const getAuthenticatedComponent = (Component: React.ComponentType) => {
    return <AuthenticatedLayout>
      <Component />
    </AuthenticatedLayout>
  };

  const getUnAuthenticatedComponent = (Component: React.ComponentType) => {
    return <>
      <ResponsiveAppBar />
      <Component />
    </>
  };

  return (
    <AuthContextProvider>
      <Router>
          <ResponsiveAppBar />
            <div style={{ paddingTop: '6em', background: theme.palette.background.default }}>
            <Routes>
              <Route path="/" element={getUnAuthenticatedComponent(ComingSoonPage)} />
              {/* <Route path="/" element={getUnAuthenticatedComponent(Home)} /> */}
              {/* <Route path="/listing" element={getUnAuthenticatedComponent(Listing)} />
              <Route path="/login" element={getUnAuthenticatedComponent(Login)} />
              <Route path="/forgotpassword" element={getUnAuthenticatedComponent(ForgotPassword)} />
              <Route path="/signup" element={getUnAuthenticatedComponent(SignUp)} />
              <Route path="/business/:businessId" element={getUnAuthenticatedComponent(DisplayBusiness)} />
              <Route path="/listHere" element={getAuthenticatedComponent(ListHere)} />
              <Route path="/profile" element={getAuthenticatedComponent(ProfilePage)} />
              <Route path="/account" element={getAuthenticatedComponent(AccountSetting)} />
              <Route path="/dashboard" element={getAuthenticatedComponent(Dashboard)} />
              <Route path="/editBusiness/:businessId" element={getAuthenticatedComponent(EditBusiness)} />
              <Route path="/unauthorized" element={getUnAuthenticatedComponent(Unauthorized)} />
              <Route path="/resetPassword/:token" element={getUnAuthenticatedComponent(NewPassword)} />
              <Route path="/post/:postId" element={getUnAuthenticatedComponent(ViewPost)} />
              <Route path="/comment/:postId" element={getUnAuthenticatedComponent(ViewPost)} />
              <Route path="/like/:postId" element={getUnAuthenticatedComponent(ViewPost)} /> */}
              <Route path="*" element={getUnAuthenticatedComponent(ComingSoonPage)} />
            </Routes>
          </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
