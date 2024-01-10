import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import carImage from '../../blue_car.png';
import Container from '@mui/material/Container';
import { NavigationBar } from '../navigation/NavigationBar';

type DriverEndJourneyProps = {
  setDriverStatus: (status: string) => void;
}


export const DriverEndJourney = (props: DriverEndJourneyProps) => {
  const toDriverHome = () => {
    props.setDriverStatus('start')
  }

  return (
    <>
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8
            }}
          >
            <Box
              sx={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={carImage} style={{width: 250, marginTop: 100}}/>
              <Typography variant='subtitle1' sx={{mt: 2, mb: 2}}>You have finished your journey!</Typography>
              <Button 
                variant='contained' 
                fullWidth 
                sx={{
                  backgroundColor: 'secondary.main', 
                  textTransform: 'none',
                  mt: 10
                }}
                onClick={toDriverHome}
              >
                Confirm
              </Button>
            </Box>
          </Container>
        </Container>
    </>
  )
}