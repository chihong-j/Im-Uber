import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { candidateInfo, itineraryData } from "../models/trip"
import dayjs from 'dayjs';
import { PassengerHome } from '../components/passenger/PassengerHome';
import PassengerCandidate from '../components/passenger/PassengerCandidate';
import PassengerMatched from '../components/passenger/PassengerMatched';
import { checkIfPassengerOnRoute } from '../apis/passenger.api';

const theme = createTheme({
    palette: {
      primary: {
        main: '#313944'
      },
      secondary: {
        main: '#9C694C'
      }
    },
    typography: {
      fontFamily: [
        'Poppins',
      ].join(',')
    }
});

export const PassengerPage = () => {
    const [passengerStatus, setPassengerStatus] = useState<string>('home')
    const [isGo, setIsGo] = useState<boolean>(true)
    // const [carAppearance, setCarAppearance] = useState(["AAA9999", "white"])
    const [selectedDriverId, setSelectedDriverId] = useState(0)
    const [candidates, setCandidates] = useState<candidateInfo[]>([])

    useEffect( () => {
      async function checkPassengerStatus() {
        try{
          const response = await checkIfPassengerOnRoute();
          console.log('passenger on route status : ', response)
          response? setPassengerStatus('matched'):setPassengerStatus('home')
        }
        catch(error : any){
          console.log(error)
        }
      }
      checkPassengerStatus();
      const storeDriverID = localStorage.getItem("selectedDriverID");
      // console.log(storeDriverID);
      if(storeDriverID !== null){
        setSelectedDriverId(Number(storeDriverID));
      }
    }, [])

    return (
      <>
        <ThemeProvider theme={theme}>
          {passengerStatus === 'home' && <PassengerHome isGo={isGo} setIsGo={setIsGo} passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} candidates={candidates} setCandidates={setCandidates}/>}
          {passengerStatus === 'candidate' && <PassengerCandidate isGo={isGo} setIsGo={setIsGo} passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} candidates={candidates} setCandidates={setCandidates} setSelectedDriverId={setSelectedDriverId}/>}
          {passengerStatus === 'matched' && <PassengerMatched passengerStatus={passengerStatus} setPassengerStatus={setPassengerStatus} selectedDriverId={selectedDriverId}/>}
        </ThemeProvider>
      </>
    )
}