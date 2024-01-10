import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { NavigationBar } from '../../navigation/NavigationBar';
import { User } from './User';
import { Car } from './Car';
import { infoBarType } from '../../../models/user.model';
import { useUserContext } from '../../../contexts/UserContext';

type UserInfoProps = {
  setInfoBar: (infobar: infoBarType) => void;
}

export const UserInfo = (props: UserInfoProps) => {
  const { setInfoBar } = props;
  const { profileStatus, setProfileStatus } = useUserContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setProfileStatus([profileStatus[0], newValue]);
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Typography component="h1" variant="h5" color="primary">
        User Info
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
            <TabList onChange={handleChange} aria-label="UserInfo label">
              <Tab label="User" value="user" sx={{textTransform: 'none'}}/>
              <Tab label="Car" value="car" sx={{textTransform: 'none'}}/>
            </TabList>
          </Box>
          <TabPanel value="user"><User setInfoBar={setInfoBar}/></TabPanel>
          <TabPanel value="car"><Car setInfoBar={setInfoBar}/></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}