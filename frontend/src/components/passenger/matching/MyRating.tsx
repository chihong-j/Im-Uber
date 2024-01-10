import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { sendRating } from '../../../apis/passenger.api';
import { getUserInfo } from '../../../apis/user.api';
import { useUserContext } from '../../../contexts/UserContext';

type RatingProps = {
  setIsRating: (status: boolean) => void;
  setPassengerStatus: (status: string) => void;
  driverId: number
}

function MyRating( props: RatingProps ) {
  const { setIsRating, setPassengerStatus, driverId } = props;
  const { setUser } = useUserContext();

  const navigate = useNavigate();
  const [tripRating, setTripRating] = React.useState<number | null>(5);

  const handleClick = async () => {
    const ratingData = {
      driverID: driverId,
      rating: tripRating,
    }
    try{
      const response = await sendRating(ratingData);
      console.log(response)
      setIsRating(false);
      setPassengerStatus('home')
      localStorage.removeItem("selectedDriverID");
    }
    catch(error : any){
      console.log(error)
    }
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
        <Typography variant='body1' sx={{mt: 5, mb: 2}}>Give your ratings!</Typography>
        <Rating
          value={tripRating}
          onChange={(event, newValue) => {
            setTripRating(newValue);
            // send trip rating to database
          }}
          sx={{mt: 3, mb: 2}}
        />
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
          Send Ratings & Go back to home page
        </Button>
      </Box>
    </>
  )
}

export default MyRating