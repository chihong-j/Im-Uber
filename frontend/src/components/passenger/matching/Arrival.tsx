import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { tripInfo } from '../../../models/trip';
import { getArrivalTime } from '../../../apis/passenger.api';

type ArrivalProps = {
  isArrival: boolean
  setIsArrival: (status: boolean) => void;
  setIsRating: (status: boolean) => void;
}

function Arrival( props: ArrivalProps ) {
  const { isArrival, setIsArrival, setIsRating } = props;

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
  }, [isArrival])

  const handleClick = () => {
    setIsArrival(false);
    setIsRating(true);
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
        <Typography variant='body1' sx={{mt: 5, mb: 2}}>Estimated Arrival Time</Typography>
        <Typography variant='h3' sx={{mb: 5}}>{trip?.dest_arrival_time.slice(11,16)}</Typography>
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
          Give your ratings!
        </Button>
      </Box>
    </>
  )
}

export default Arrival