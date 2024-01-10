import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react'
import { tripInfo } from '../../../models/trip';
import { getArrivalTime } from '../../../apis/passenger.api';
import { carColor } from '../../../models/carColor';

type DepartureProps = {
  isDeparture: boolean;
  setIsDeparture: (status: boolean) => void;
  setIsArrival: (status: boolean) => void;
}

function Departure( props: DepartureProps ) {
  const { isDeparture, setIsArrival, setIsDeparture } = props;
  const [trip, setTrip] = useState<tripInfo|null>(null)

  useEffect( () => {
    async function fetchTime() {
      try{
        const response = await getArrivalTime();
        console.log(response)
        setTrip(response)
      }
      catch(error : any){
        console.log(error)
      }
    }
    fetchTime();
  }, [isDeparture])

  const handleClick = () => {
    setIsDeparture(false);
    setIsArrival(true);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1' sx={{mt: 5, mb: 2}}>Estimated Departure Time</Typography>
        {trip && <Typography variant='h3' sx={{mb: 5}}>{trip.stop_arrival_time.slice(11,16)}</Typography>}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <Typography variant='body1' sx={{mt: 2, mr : 1}}>Car Appearance</Typography>
            {trip && <Typography variant='h5' sx={{mt:2, mb: 2}}>{carColor[trip.CarInfo.color]}    {trip.CarInfo.type}</Typography>}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
          >
            <Typography variant='body1' sx={{mt: 2, ml : 1}}>License Plate</Typography>
            {trip && <Typography variant='h5' sx={{mt: 2, mb: 2}}>{trip.CarInfo.carPlate}</Typography>}
          </Box>
        </Box>
        <Button 
          variant='contained' 
          fullWidth 
          sx={{
            backgroundColor: 'secondary.main', 
            textTransform: 'none',
            mt: 10
          }}
          onClick={handleClick}
        >
          I am in the Car
        </Button>
      </Box>
    </>
  )
}

export default Departure