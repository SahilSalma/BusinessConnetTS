import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import LoggedInAvatar from '../CommonComponents/LoggedInAvatar';
import SearchIcon from '@mui/icons-material/Search';
import Logo from './Logo';
import { useAuth } from '../Context/authContext';
import Notification from './Notification';
import Messages from './Messages';
import { useDispatch } from 'react-redux';
import { Actions } from '../Redux/Reducer/rootReducer';

const pages = ['Home', 'Listing', 'List Here'] as const;

const unAuthenticatedPages = ['Home', 'Listing', 'List Here'] as const;
const authenticatedPages = ['Home', 'Listing', 'List Here'] as const;

type Page = typeof pages[number];
const pageLinks: Record<Page, string> = {
  'Home': '/',
  'Listing': '/listing',
  'List Here': '/listHere',
};

const ResponsiveAppBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const history = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [navigationPages, setNavigationPages] = useState<Page[]>([...unAuthenticatedPages]);
  const dispatch = useDispatch();


  useEffect(() => {
    user?._id && dispatch(Actions.notifications.fetchNotificationAction.request({ userId: user._id }));
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleSignIn = () => {
    history('/login');
  };

  const handleCloseNavMenu = (page: Page) => {
    setAnchorElNav(null);
    history(pageLinks[page], { state: { pageName: page } });
  };

  const showButton = window.location.pathname === '/login' || window.location.pathname === '/signUp' ? false : true;

  useEffect(() => {
    if (isAuthenticated){
      setNavigationPages([...authenticatedPages])
    } else {
      setNavigationPages([...unAuthenticatedPages])
    }
  }, [isAuthenticated]);

  const getDesktopMenu = () => (
      <>
        {navigationPages.map((page) => (
          <Button key={page} sx={{ my: 2, display: {xs: 'none', md: 'block'}, color: 'white' }} onClick={() => handleCloseNavMenu(page)}>
            {page}
          </Button>
        ))}
        </>
  );

  const getMobileMenu = () => (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={() => setAnchorElNav(null)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {navigationPages.map((page) => (
            <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const theme = useTheme();
  const gradientColor = theme.palette.primary.main;

  return (
    <AppBar 
        position="fixed"
        sx={{
        background: gradientColor,
        boxShadow: 2,
        height: '6em',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
        }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: 'space-between', mr: 3}}>
          <Logo />
          {/* {getDesktopMenu()}
          {getMobileMenu()} */}
          {/* <Search
            sx={{
              display: { xs: 'none', md: 'flex' },
              maxWidth: '0em',
              borderRadius: '0.5em',
              border: '1px solid white',
              transition: 'max-width 0.3s ease',
              '&:focus-within': {
                maxWidth: '35em',
                flexGrow: 1,
              },
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase 
              placeholder="Search…" 
              inputProps={{ 'aria-label': 'search' }} 
            />
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Messages/>
            <Notification />
            {showButton ? isAuthenticated ? <LoggedInAvatar /> : <Button variant="outlined" style={{color: 'white'}} onClick={handleSignIn}>Sign In</Button> : null}
          </Box> */}
          <Typography variant="h4" component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
            Business Networking and Management
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
