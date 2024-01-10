import { ThemeProvider } from '@emotion/react';
import { Button, Paper, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import createTheme from '@mui/material/styles/createTheme';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CandidateDetail from './CandidateDetail';
import { NavigationBar } from '../navigation/NavigationBar';
import { candidateInfo } from '../../models/trip';


type PassengerCandidateProps = {
  isGo: boolean;
  setIsGo: (isGo: boolean) => void;
  passengerStatus: string;
  setPassengerStatus: (status: string) => void;
  candidates: candidateInfo[];
  setCandidates: (candidates: candidateInfo[]) => void
  setSelectedDriverId: (status: number) => void
}

function PassengerCandidate( props: PassengerCandidateProps) {

  const { isGo, setIsGo, passengerStatus, setPassengerStatus, candidates, setCandidates, setSelectedDriverId } = props;
  const [driverIsShown, setDriverIsShown] = useState(false);
  const [shownCandidate, setShownCandidate] = useState<candidateInfo>(candidates[0]);

  // useEffect( () => {

  // }, [driverIsShown])
  
  const navigate = useNavigate()
  const toPassengerHomePage = () => {
    setPassengerStatus('home')
  }

  const showCandidateDetail = (candidate: candidateInfo) => {
    setDriverIsShown(current => !current);
    setShownCandidate(candidate);
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        <Container maxWidth="xs">
          <NavigationBar></NavigationBar>
          <Container 
            sx={{
              width: 0.8
            }}
          >
          {driverIsShown === false &&
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              minHeight="90vh"
            >
              <Typography variant="h4" sx={{ mt: 2, mb: 2}}>
               Trips
              </Typography>
              <Paper
                style={{ maxHeight: 450 , overflow: 'auto'}}         
              >
              {candidates.map((candidate)=>(
                <Button 
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    height : 100,
                    textTransform : "none",
                    mb: 1, 
                  }}
                  onClick={() => showCandidateDetail(candidate)}
                >
                  {candidate.driverName}
                </Button>
              ))}
              </Paper>
                <Button            
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor : "secondary.main",
                    textTransform : "none",
                    mb: 2, mt: 5,
                    height: 40,
                  }}
                  onClick={toPassengerHomePage}
                >
                  Back
                </Button>
            </Box>
          }
          {driverIsShown === true && <CandidateDetail isGo={isGo} setDriverIsShown={setDriverIsShown} candidate={shownCandidate} passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} setSelectedDriverId={setSelectedDriverId}/>}    
          </Container>
        </Container>
    </>
  )
}

export default PassengerCandidate