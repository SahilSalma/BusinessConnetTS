import React from 'react';
import {
  Grid2 as Grid,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const LoggedInAvatar: React.FC = () => {
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const settingsIcons = ['person', 'account_circle', 'dashboard', 'logout'];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOnClick = (setting: string) => {
    if (setting === 'Logout') {
      logout();
      navigate('/');
    } else {
      navigate('/' + setting.toLowerCase());
    }
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Grid container spacing={2} sx={{ marginLeft: 0.2, marginRight: 5 }} alignItems="center">
          <Grid>
            <Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" sx={{ width: 50, height: 50, mx: 'auto', my: 2 }} />
          </Grid>
          <Grid>
            <Typography textAlign="center" variant="h6">
              {user?.firstName} {user?.lastName}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        {settings.map((setting, index) => (
          <MenuItem key={setting} onClick={() => handleOnClick(setting)}>
            <IconButton size="small" sx={{ mr: 1 }}>
              {settingsIcons[index] === 'person' && <PersonIcon />}
              {settingsIcons[index] === 'account_circle' && <AccountCircleIcon />}
              {settingsIcons[index] === 'dashboard' && <DashboardIcon />}
              {settingsIcons[index] === 'logout' && <LogoutIcon />}
            </IconButton>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LoggedInAvatar;
