import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { NavigationBar } from '../navigation/NavigationBar';
import { showStops } from '../../apis/driver.journey.api';
import { Stop } from '../../models/stop.model';
import { ItineraryData } from '../../models/journey.model';
import { useUserContext } from '../../contexts/UserContext';

type driverStartProps = {
    setDriverStatus: (status: string) => void;
    setStops: (stops: Stop[]) => void;
    itineraryData: ItineraryData;
    setItineraryData: (itineraryData: ItineraryData) => void;
    isGo: boolean;
    setIsGo: (isGo: boolean) => void;
}

export const DriverStart = (props: driverStartProps) => {
    const { setDriverStatus, setStops, itineraryData, setItineraryData, isGo, setIsGo } = props;
    const { user } = useUserContext();
    const [favUsed, setFavUsed] = React.useState<boolean>(false);
    const currentDate = dayjs().startOf('day');
    const currentTime = dayjs().startOf('minute');
    const selectedDate = itineraryData.date?.startOf('day');
    const selectedTime = itineraryData.time?.startOf('minute');
    const maxPassengerCount = user?.car?.seat ?? 4;
    const passengerOptions = Array.from({ length: maxPassengerCount || 0 }, (_, index) => index + 1);
    const toDriverStopsPage = async () => {
        if (favUsed) {
            setDriverStatus('stops');
            return;
        }
        const queryData = {
            isGo: isGo,
            address: isGo ? itineraryData.start : itineraryData.destination,
        }
        try {
            const response = await showStops(queryData);
            setStops(response.Stops);
            setDriverStatus('stops');
        }
        catch (error: any) {
            console.log(error);
        }
    }
    const goBoardTime = user?.favRoute.driver.GO.time;
    const goBoardTimeDayjs = goBoardTime ? dayjs(goBoardTime, "HH:mm:ss") : null;
    const backBoardTime = user?.favRoute.driver.BACK.time;
    const backBoardTimeDayjs = backBoardTime ? dayjs(backBoardTime, "HH:mm:ss") : null;
    const driverFavRouteToWork: ItineraryData = {
        start: user?.favRoute.driver.GO.address || "",
        destination: '台積電',
        passengerCount : String(user?.car.seat),
        date: goBoardTimeDayjs && goBoardTimeDayjs.isAfter(currentTime)
            ? currentTime
            : currentTime.add(1, 'day'),
        time: goBoardTimeDayjs || null,
    }

    const driverFavRouteToHome: ItineraryData = {
        start: '台積電',
        destination:user?.favRoute.driver.BACK.address || "",
        passengerCount : String(user?.car.seat),
        date: backBoardTimeDayjs && backBoardTimeDayjs.isAfter(currentTime)
            ? currentTime
            : currentTime.add(1, 'day'),
        time: backBoardTimeDayjs || null,
    }

    const favStopsToWork: Stop[] = user?.favRoute.driver.GO.stopIDs
        ? user.favRoute.driver.GO.stopIDs.map((stopID, index) => ({
            stopID,
            Name: user?.favRoute.driver.GO.stopNames?.[index] || '',
            address: user?.favRoute.driver.GO.stopAddresses?.[index] || '',
            }))
        : [];

    const favStopsToHome: Stop[] = user?.favRoute.driver.BACK.stopIDs
        ? user.favRoute.driver.BACK.stopIDs.map((stopID, index) => ({
            stopID,
            Name: user?.favRoute.driver.BACK.stopNames?.[index] || '',
            address: user?.favRoute.driver.BACK.stopAddresses?.[index] || '',
            }))
        : [];

    const handleInputChange = (field: keyof ItineraryData, value: string | number | Dayjs | null) => {
        const updatedItineraryData = {
            ...itineraryData,
            [field]: value,
        };
        setItineraryData(updatedItineraryData);
    };

    const useFavoriteRoute = () => {
        if (isGo) {
            console.log(user?.favRoute.driver.GO)
            if (user?.favRoute.driver.GO.address) {
                setItineraryData(driverFavRouteToWork);
                setStops(favStopsToWork)
                setFavUsed(true);
            }
            else {
              alert("Favorite route is not yet set")
            }
        }
        else {
            if (user?.favRoute.driver.BACK.address) {
                setItineraryData(driverFavRouteToHome);
                setStops(favStopsToHome)
                setFavUsed(true);
            }
            else {
              alert("Favorite route is not yet set")
            }
        }
    }

    const clearFavRoute = () => {
        if (isGo) {
            toWork();
        }
        else {
            toHome();
        }
        setStops([]);
    }

    const toWork = () => {
        setIsGo(true);
        setFavUsed(false);
        const updatedItineraryData = {
            start: "",
            destination: "台積電",
            passengerCount: "4",
            date: dayjs(),
            time: dayjs().add(1, 'hour'),
        }
        setItineraryData(updatedItineraryData);
    }

    const toHome = () => {
        setIsGo(false);
        setFavUsed(false);
        const updatedItineraryData = {
            start: "台積電",
            destination: "",
            passengerCount: "4",
            date: dayjs(),
            time: dayjs().add(1, 'hour'),
        }
        setItineraryData(updatedItineraryData);
    }

  return (
    <>
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
                  Driver
                </Typography>
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
                    mb: 2, mt: 2, ml: 'auto', float: 'right',
                  }}
                  onClick={clearFavRoute}
                >
                  Clear
                </Button>
                <div>
                  Start
                  <TextField
                    fullWidth
                    label="Enter your start location"
                    size="small"
                    sx={{ mb: 1.5, mt: 1 }}
                    value={itineraryData.start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('start', e.target.value)}
                    disabled={!isGo || favUsed}
                  />
                  Destination
                  <TextField
                    fullWidth
                    label="Enter your destination location"
                    size="small" 
                    sx={{ mb: 1.5, mt: 1 }}
                    value={itineraryData.destination}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('destination', e.target.value)}
                    disabled={isGo || favUsed}
                  />
                  Passenger Count
                  <Select
                    fullWidth
                    size='small'
                    sx={{ mb: 1.5, mt: 1 }}
                    value={itineraryData.passengerCount}
                    onChange={(e: SelectChangeEvent) => handleInputChange('passengerCount', e.target.value)}
                  >
                    {passengerOptions.map((count) => (
                      <MenuItem key={count} value={count}>
                        {count}
                      </MenuItem>
                    ))}
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
                          value={itineraryData.date}
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
                          value={itineraryData.time}
                          minTime={itineraryData.date?.isSame(dayjs(), 'day') ? dayjs() : null}
                          onChange={(newTime) => handleInputChange('time', newTime)}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Box>
                  <Button variant="contained" fullWidth onClick={toDriverStopsPage}
                    sx={{
                      textTransform : "none",
                      backgroundColor : "secondary.main",
                      mb: 1, mt: 3,
                    }}
                    disabled={itineraryData.start === "" || itineraryData.destination === "" || (selectedDate?.isSame(currentDate) && selectedTime?.isBefore(currentTime)) || itineraryData.time === null || itineraryData.date === null}
                  >
                    Select Stops
                  </Button>
                </div>
              </div>
            </Box>
          </Container>
        </Container>
    </>
  )
} 
