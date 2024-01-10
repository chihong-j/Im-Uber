import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import carImage from '../../blue_car.png';
import React, { useState } from 'react'
import Arrival from './matching/Arrival';
import Departure from './matching/Departure';
import MyRating from './matching/MyRating';
import { NavigationBar } from '../navigation/NavigationBar';
// import Arrival from '../components/matching/Arrival';
// import Departure from '../components/matching/Departure';
// import MyRating from '../components/matching/Rating';
// import { NavigationBar } from '../components/navigation/NavigationBar';
import { useUserContext } from '../../contexts/UserContext';


type PassengerMatchedProps = {
  passengerStatus: string;
  setPassengerStatus: (status: string) => void;
  selectedDriverId: number;
}

function PassengerMatched( props: PassengerMatchedProps ) {

  const { passengerStatus, setPassengerStatus, selectedDriverId } = props;

  // const [isDeparture, setIsDeparture] = useState(true);
  // const [isArrival, setIsArrival] = useState(false);
  // const [isRating, setIsRating] = useState(false);
  const { isDeparture, setIsDeparture, isArrival, setIsArrival, isRating, setIsRating } = useUserContext();
  
  return (
    <>
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src={carImage}/>
            {isDeparture === true && <Departure isDeparture={isDeparture} setIsArrival={setIsArrival} setIsDeparture={setIsDeparture}/>}
            {isArrival === true && <Arrival isArrival={isArrival} setIsArrival={setIsArrival} setIsRating={setIsRating}/>}
            {isRating === true && <MyRating setIsRating={setIsRating} setPassengerStatus={setPassengerStatus} driverId={selectedDriverId}/>}

            {/* <Button variant='contained' fullWidth sx={{backgroundColor: 'secondary.main', textTransform: 'none'}}>I'm in the Car</Button> */}
          </Container>
        </Container>
    </>
  )
}

export default PassengerMatched

