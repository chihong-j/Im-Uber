import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavigationBar } from '../navigation/NavigationBar';
import { useUserContext } from '../../contexts/UserContext';

const BigButton = styled(Button)({
  textTransform: 'none',
  fontSize: "24px",
  height: "80px",
  width: "275px"
});

export const ProfileSelection = () => {
  const { setProfileStatus } = useUserContext();
  return (
    <>
      <NavigationBar></NavigationBar>
      <Typography component="h1" variant="h5" color="primary">
        User Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: 'space-evenly',
          pt: "20px",
          pb: "20px",
          minHeight: "50vh"
        }}
      >
        <BigButton variant='contained' onClick={() => setProfileStatus(["userInfo", "user"])}>User Info</BigButton>
        <BigButton variant='contained' onClick={() => setProfileStatus(["favRoute", "passenger"])}>Favorite Route</BigButton>
      </Box>
    </>
  );
}