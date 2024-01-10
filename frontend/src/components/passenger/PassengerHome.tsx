import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { NavigationBar } from '../navigation/NavigationBar';
import { candidateInfo, itineraryData } from "../../models/trip";
import { getCandidate , updatePassengerFav } from '../../apis/passenger.api';
import { PassengerFav } from '../../models/journey.model';
import { getUserInfo } from '../../apis/user.api';
import { infoBarType } from '../../models/user.model';



type PassengerHomeProps = {
  isGo: boolean;
  setIsGo: (isGo: boolean) => void;
  passengerStatus: string;
  setPassengerStatus: (status: string) => void;
  candidates: candidateInfo[];
  setCandidates: (candidates: candidateInfo[]) => void
  // passengerItineraryData: itineraryData;
  // setPassengerItineraryData: (status: itineraryData) => void;
}

export const PassengerHome = ( props: PassengerHomeProps ) => {

  const { isGo, setIsGo, passengerStatus, setPassengerStatus, candidates, setCandidates } = props;
  const [ infoBar, setInfoBar ] = useState<infoBarType>({open: false, type: "success", message: "success"});
  const [passengerItineraryData, setPassengerItineraryData] = useState({
    toTSMC: true,
    start: "",
    destination: "",
    passengerCount: "1",
    date: dayjs(),
    time: dayjs(),
  });

  const currentDate = dayjs().startOf('day');
  const currentTime = dayjs().startOf('minute');
  const selectedDate = passengerItineraryData.date?.startOf('day');
  const selectedTime = passengerItineraryData.time?.startOf('minute');
  // const { isGo, setIsGo, passengerStatus, setPassengerStatus, passengerItineraryData, setPassengerItineraryData } = props;
  const navigate = useNavigate()

  const searchPassengerCandidate = async () => {
    // add API to search candidate
    const combinedDateTimeString: string | null =
    passengerItineraryData.date &&
    passengerItineraryData.time &&
    passengerItineraryData.date
      .year(passengerItineraryData.date.year())
      .month(passengerItineraryData.date.month())
      .date(passengerItineraryData.date.date())
      .hour(passengerItineraryData.time.hour())
      .minute(passengerItineraryData.time.minute())
      .second(passengerItineraryData.time.second())
      .millisecond(passengerItineraryData.time.millisecond())
      .format('YYYY-MM-DD HH:mm:ss') || null;
  
    const queryData = {
      Go: isGo,
      address: isGo ? passengerItineraryData.start : passengerItineraryData.destination,
      passenger_cnt: +passengerItineraryData.passengerCount,
      board_time: combinedDateTimeString,
  }
    try{
      const candidateList = await getCandidate(queryData);
      console.log(candidateList)
      if (candidateList.length === 0){
        alert('There is no driver near you at this moment. Maybe change time or date of the schedule.')
      }
      else{
        setCandidates(candidateList)        
        setPassengerStatus('candidate')
      }
    }
    catch(error: any){
      console.log(error)
    }
  }

  const handleInputChange = (field: keyof itineraryData, value: string | number | Dayjs | null) => {
    setPassengerItineraryData((prevItineraryData) => ({
        ...prevItineraryData,
        [field]: value,
    }));
  };

  const useFavoriteRoute = async () => {
    myLabel : try{
      const myInfo = await getUserInfo();
      const favoriteRoute = myInfo.favRoute.passenger;
      console.log(myInfo);
      if (isGo) {
        if (favoriteRoute.GO.address === null){
          alert('Favorite route is not yet set')
          break myLabel;
        }
      } else {
        if (favoriteRoute.BACK.address === null){
          alert('Favorite route is not yet set')
          break myLabel;
        }
      }
      handleInputChange('start', isGo? favoriteRoute.GO.address:"台積電");
      handleInputChange('destination', isGo? "台積電":favoriteRoute.BACK.address);
      handleInputChange('passengerCount', isGo? favoriteRoute.GO.passengerCnt:favoriteRoute.BACK.passengerCnt);
      handleInputChange('date', dayjs());
      handleInputChange('time', isGo? dayjs(favoriteRoute.GO.boardTime, "HH:mm:ss"):dayjs(favoriteRoute.BACK.boardTime, "HH:mm:ss"));
      }
    catch(error: any){
      console.log(error)
    }
  }

  const toWork = () => {
    setIsGo(true);
    const updatedItineraryData = {
        ...passengerItineraryData,
        ["start"]: "",
        ["destination"]: "台積電",
    }
    setPassengerItineraryData(updatedItineraryData);
  }

  const toHome = () => {
    setIsGo(false);
    const updatedItineraryData = {
        ...passengerItineraryData,
        ["start"]: "台積電",
        ["destination"]: "",
    }
    setPassengerItineraryData(updatedItineraryData);
  }

  const updatePassengerFavRoute = async () => {
    const formattedTimeString: string | null =
      passengerItineraryData.time &&
      passengerItineraryData.time.format('HH:mm:ss') || null;
    
    const favData: PassengerFav = {
      GO: {
        address: isGo ? passengerItineraryData.start : null,
        passengerCnt: +passengerItineraryData.passengerCount,
        boardTime: formattedTimeString
      },
      BACK: {
        address: isGo ? null : passengerItineraryData.destination,
        passengerCnt: +passengerItineraryData.passengerCount,
        boardTime: formattedTimeString
      }
    }
    try {
      const response = await updatePassengerFav(favData);
      return response;
    }
    catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container sx={{ width: 0.8 }} >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              minHeight="90vh"
            >
              <div>
                <Typography variant="h4" fontWeight="bold">
                  Start journey 
                </Typography>
                <ButtonGroup 
                    variant="outlined" 
                    aria-label="outlined button group"
                    size="small"
                    sx={{
                        color : "secondary",
                        mt: 2,
                    }}
                >
                    <Button onClick={toWork}>Go to Work</Button>
                    <Button onClick={toHome}>Back Home</Button>
                </ButtonGroup>
                <Button variant="contained" 
                  sx={{
                    textTransform : "none",
                    mb: 2, mt: 2,
                  }}
                  onClick={useFavoriteRoute}
                >
                  Use favorite route 
                </Button>
                <Button variant="contained" 
                  sx={{
                    textTransform : "none",
                    mb: 2,
                  }}
                  onClick={updatePassengerFavRoute}
                >
                  Set as Favorite 
                </Button>
                <div>
                  Start
                  <TextField
                    fullWidth
                    label="Enter your start location"
                    size="small"
                    sx={{ mb: 1.5, mt: 1 }}
                    value={passengerItineraryData.start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('start', e.target.value)}
                  />
                  Destination
                  <TextField
                    fullWidth
                    label="Enter your destination location"
                    size="small" 
                    sx={{ mb: 1.5, mt: 1 }}
                    value={passengerItineraryData.destination}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('destination', e.target.value)}
                  />
                  Passenger Count
                  <Select
                    fullWidth
                    size='small'
                    sx={{ mb: 1.5, mt: 1 }}
                    value={passengerItineraryData.passengerCount}
                    onChange={(e: SelectChangeEvent) => handleInputChange('passengerCount', e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                  <Box
                    display="flex"
                    flexDirection="row"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}> 
                      <Box sx={{ mr:2 }} >
                        Date
                        <MobileDatePicker 
                          defaultValue={dayjs()} 
                          slotProps={{ textField: {size: 'small'} }} 
                          sx={{ mt: 1 }}
                          value={passengerItineraryData.date}
                          minDate={dayjs()}
                          onChange={(newDate) => handleInputChange('date', newDate)}
                        />
                      </Box>
                      <Box sx={{ ml:1 }} >
                        Time
                        <MobileTimePicker 
                          defaultValue={dayjs()} 
                          slotProps={{ textField: {size: 'small'} }} 
                          sx={{ mt: 1 }}
                          value={passengerItineraryData.time}
                          minTime={passengerItineraryData.date?.isSame(dayjs(), 'day') ? dayjs() : null}
                          onChange={(newTime) => handleInputChange('time', newTime)}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                  <Button variant="contained" fullWidth onClick={searchPassengerCandidate}
                    sx={{
                      textTransform : "none",
                      backgroundColor : "secondary.main",
                      mb: 1, mt: 3,
                    }}
                    disabled={passengerItineraryData.start === "" || passengerItineraryData.destination === "" || (selectedDate?.isSame(currentDate) && selectedTime?.isBefore(currentTime))}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </Box>
          </Container>
        </Container>
      {/* </ThemeProvider> */}
    </>
  )
} 
