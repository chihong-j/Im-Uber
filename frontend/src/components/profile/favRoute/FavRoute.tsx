import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { NavigationBar } from '../../navigation/NavigationBar';
import { PassengerRoute } from './PassengerRoute';
import { DriverRoute } from './DriverRoute';
import { infoBarType } from '../../../models/user.model';
import { useUserContext } from '../../../contexts/UserContext';

type FavRouteProps = {
  setInfoBar: (infoBar: infoBarType) => void;
}

export const FavRoute = (props: FavRouteProps) => {
  const { setInfoBar } = props;
  const { user, profileStatus, setProfileStatus } = useUserContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if(user !== null && user.driver === false && newValue === "driver"){
      setInfoBar({open: true, type: "error", message: "Please go to User Info to sign up car information first."});
    }else{
      setProfileStatus([profileStatus[0], newValue]);
    }
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Typography component="h1" variant="h5" color="primary">
        Favorite Route
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          pt: "20px",
          pb: "20px",
          minHeight: "75vh"
        }}
      >
        <TabContext value={profileStatus[1]}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="FavRoute label">
              <Tab label="As a passenger" value="passenger" sx={{textTransform: 'none'}}/>
              <Tab label="As a driver" value="driver" sx={{textTransform: 'none'}}/>
            </TabList>
          </Box>
          <TabPanel value="passenger"><PassengerRoute setInfoBar={setInfoBar}/></TabPanel>
          <TabPanel value="driver"><DriverRoute setInfoBar={setInfoBar}/></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}