import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserContext } from '../../contexts/UserContext';
import { userMode } from '../../models/user.model';
import { signOut } from '../../apis/sign.api';
import { ifDriverOnRoute, showBoardingInfo } from '../../apis/driver.journey.api';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const NavigationBar = () => {
  const theme = useTheme();
  const location = useLocation();
  // console.log(location);
  const [open, setOpen] = useState(false);
  // const [lastHome, setLastHome] = useState<string>("");
  const { user, setUser, setProfileStatus, lastHome, setLastHome, driverStatus, setDriverStatus, setBoardingInfo } = useUserContext();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const myNav = (url: string) => {
    setOpen(false);
    navigate(url);
  }

  const logOut = async () => {
    setOpen(false);
    const response = await signOut();
    setLastHome("/passengerHome");
    // setDriverStatus('start');
    setProfileStatus(["home", ""]);
    localStorage.removeItem("uberUser");
    myNav("/");
  }

  const navHome = () => {
    if(location.pathname !== "/profile"){
      setOpen(false);
    }else if(user !== null){
      if(user.mode === userMode.Driver){
        myNav("/driverHome");
      }else{
        myNav(lastHome);
      }
    }
  }

  const navProfile = () => {
    if(location.pathname !== "/profile")
      setLastHome(location.pathname);
    console.log(location);
    console.log(lastHome);
    myNav("/profile");
  }

  const switchMode = async () => {
    if(user !== null){
      if(user.mode === userMode.Passenger && user.driver === false){
        setProfileStatus(["userInfo", "car"]);
        myNav("/profile");
      }else{
        if(user.mode === userMode.Passenger) {
          try {
            const driverOnRoute = await ifDriverOnRoute();
            if (driverOnRoute) {
              const boardingResponse = await showBoardingInfo();
              setBoardingInfo(boardingResponse.stops);
              setDriverStatus('onJourney');
            }
          }
          catch (error: any) {
            console.log(error);
          }
          myNav("/driverHome");
        }
        else
          myNav("/passengerHome");
        setUser({...user, mode: (user.mode === userMode.Driver)? userMode.Passenger : userMode.Driver});
      }
    }
  }

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#313944",
            color: "#ffffff",
            justifyContent: 'space-between',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "#ffffff" }}/> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem key="Home" disablePadding>
              <ListItemButton
                sx={{ margin: "10px", borderRadius: "5px", backgroundColor: (location.pathname === "/profile")? "inherit":"#9C694C" }}
                onClick={() => navHome()}
              >
                <ListItemIcon>
                  <HomeIcon sx={{ color: "#ffffff" }}/>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Profile" disablePadding>
              <ListItemButton
                sx={{ margin: "10px", borderRadius: "5px", backgroundColor: (location.pathname === "/profile")? "#9C694C":"inherit" }}
                onClick={() => navProfile()}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "#ffffff" }}/>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </div>
        <List sx={{ margin: "10px" }}>
          <ListItem key="Switch" style={{display: (location.pathname === "/passengerMatched" || (location.pathname === "/driverHome" && driverStatus !== "start"))? "none" : "flex"}} disablePadding>
            <ListItemButton
              sx={{ borderRadius: "5px" }}
              onClick={() => switchMode()}
            >
              {/* TODO: need to check location to decide visibility */}
              <ListItemText sx={{ textAlign: 'center' }} primary={(user !== null && user.mode === userMode.Driver)? "Switch to passenger" : "Switch to Driver"} />
            </ListItemButton>
          </ListItem>
          <ListItem key="LogOut" disablePadding>
            <ListItemButton
              sx={{ borderRadius: "5px" }}
              onClick={() => logOut()}
            >
              <ListItemText primaryTypographyProps={{ textAlign: 'center', color: '#86744C', fontWeight: 'bold' }} primary="Log out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
    <DrawerHeader />
    </>
  );
}