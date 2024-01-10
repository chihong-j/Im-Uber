import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ProfileSelection } from "../components/profile/ProfileSelection";
import { UserInfo } from "../components/profile/userInfo/UserInfo";
import { FavRoute } from '../components/profile/favRoute/FavRoute';
import { infoBarType } from '../models/user.model';
import { useUserContext } from '../contexts/UserContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#313944'
    }
  }
});

// enum ProfileStatus {
//   Home = "home",
//   UserInfo = "userInfo",
//   FavRoute = "favRoute",
//   CarInfo = "carInfo",
// }

export const ProfilePage = () => {
  // const [ status, setStatus ] = useState<string>(ProfileStatus.Home);
  const { profileStatus } = useUserContext();
  const [ infoBar, setInfoBar ] = useState<infoBarType>({open: false, type: "success", message: "success"});
  // TODO: use context or parent page pass user information
  // const [ user, setUser ] = useState<userInfo>({
  //   name: "example",
  //   email: "123@gmail.com",
  //   phone: "0900000000",
  //   gender: "Male",
  //   home: "台北市中正區思源街16-3號",
  //   company: "桃園市龍潭區龍園六路101號",
  //   wallet: 100,
  //   driver: true,
  //   mode: userMode.Driver,
  //   favRoute: {
  //     passenger: {
  //       Go: {
  //         address: "台北市大安區羅斯福路四段一號",
  //         passengerCnt: 1,
  //         time: "08:54:21" 
  //       },
  //       Back: {
  //         address: "台北市大安區羅斯福路四段一號",
  //         passengerCnt: 1,
  //         time: "18:54:12" 
  //       }
  //     },
  //     driver: {
  //       Go: {
  //         address: "台北市大安區羅斯福路四段一號",
  //         time: "07:00:00",
  //         stopIDs: [12, 24, 63, 7, 2, 111],
  //         stopNames: ["竹北遠東百貨", "至善公園", "汐止火車站", "香山天后宮", "國賓大飯店", "大安站"]
  //       },
  //       Back: {
  //         address: "台北市大安區羅斯福路四段一號",
  //         time: "23:07:20",
  //         stopIDs: [111, 2, 7, 63, 24, 12],
  //         stopNames: ["大安站", "國賓大飯店", "香山天后宮", "汐止火車站", "至善公園", "竹北遠東百貨"]
  //       }
  //     }
  //   },
  //   car: {brand: 1, type: "Sedan", seat: 4, license: "ABC-9999", color: 1, electric: false},
  //   nCancel: 0,
  //   rating: "4.5",
  // });
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '95vh',
          }}
        >
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                ml: 3,
                mr: 3,
                pt: "30px",
                pl: "20px",
                pr: "20px",
                minHeight: "70vh"
              }}
            >
              {profileStatus[0] === "home" && <ProfileSelection />}
              {profileStatus[0] === "userInfo" && <UserInfo setInfoBar={setInfoBar}/>}
              {profileStatus[0] === "favRoute" && <FavRoute setInfoBar={setInfoBar}/>}
            </Box>
          </Container>
        </div>
        <Snackbar open={infoBar.open} autoHideDuration={2000} onClose={() => setInfoBar({...infoBar, open: false})}>
          <Alert onClose={() => setInfoBar({...infoBar, open: false})} severity={infoBar.type} sx={{ width: '100%' }}>
            {infoBar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}