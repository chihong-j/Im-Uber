import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DriverStart } from '../components/driver/DriverStart';
import { DriverStops } from '../components/driver/DriverStops';
import { DriverWaitJourney } from '../components/driver/DriverWaitJourney';
import { DriverOnJourney } from '../components/driver/DriverOnJourney';
import { DriverEndJourney } from '../components/driver/DriverEndJourney';
import { Stop } from "../models/stop.model"
import { ItineraryData, Boarding } from "../models/journey.model"
import { useUserContext } from '../contexts/UserContext';
import dayjs from 'dayjs';

const theme = createTheme({
    palette: {
      primary: {
        main: '#313944'
      },
      secondary: {
        main: '#9C694C'
      }
    }
});

export const DriverHomePage = () => {
    const [isGo, setIsGo] = useState<boolean>(true)
    const [stops, setStops] = useState<Stop[]>([])
    const { driverStatus, setDriverStatus, boardingInfo, setBoardingInfo, user } = useUserContext();
    const maxPassengerCount = user?.car?.seat !== null ? user?.car.seat ?? 4 : 4;
    const [itineraryData, setItineraryData] = useState<ItineraryData>({
        start: "",
        destination: "台積電",
        passengerCount: maxPassengerCount.toString(),
        date: dayjs(),
        time: dayjs().add(1, 'hour'),
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                {driverStatus === 'start' && <DriverStart setDriverStatus={setDriverStatus} setStops={setStops} itineraryData={itineraryData} setItineraryData={setItineraryData} isGo={isGo} setIsGo={setIsGo} />}
                {driverStatus === 'stops' && <DriverStops setDriverStatus={setDriverStatus} itineraryData={itineraryData} stops={stops} isGo={isGo} setBoardingInfo={setBoardingInfo}/>}
                {driverStatus === 'waitJourney' && <DriverWaitJourney setDriverStatus={setDriverStatus} boardingInfo={boardingInfo} setBoardingInfo={setBoardingInfo}/>}
                {driverStatus === 'onJourney' && <DriverOnJourney setDriverStatus={setDriverStatus} boardingInfo={boardingInfo} />}
                {driverStatus === 'endJourney' && <DriverEndJourney setDriverStatus={setDriverStatus} />}
            </ThemeProvider>
        </>
    )
}