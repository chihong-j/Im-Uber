import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import carImage from '../../blue_car.png';
import Container from '@mui/material/Container';
import React, { useState } from 'react'
import { NavigationBar } from '../navigation/NavigationBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { Boarding, Passenger } from "../../models/journey.model"
import { finishRoute } from "../../apis/driver.journey.api"

type DriverOnJourneyProps = {
  boardingInfo: Boarding[];
  setDriverStatus: (status: string) => void;
}

export const DriverOnJourney = (props: DriverOnJourneyProps) => {
  const { setDriverStatus, boardingInfo } = props;
  const [modalAddress, setModalAddress] = useState<string>("")
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = (idx: number) => {
    setModalAddress(boardingInfo[idx].address);
    setPassengers(boardingInfo[idx].passengers);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  
  const toDriverEndJourney = async () => {
    try {
        const response = await finishRoute();
        console.log(response);
        setDriverStatus('endJourney')
    }
    catch (error: any) {
        console.log(error);
    }
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={carImage} style={{width: 120}}/>
              <Typography variant="h5" sx={{mb: 2}}>
                On the way!
              </Typography>
            </Box>
            <Box sx={{ width: '100%', height: '400px', overflowY: 'auto', mt: 9 }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {boardingInfo.map((stop, idx) => {
                  const totalCount: number = stop.passengers.reduce((total, passenger) => total + passenger.count, 0);
                  return (
                    <ListItem key={idx} onClick={()=>handleOpen(idx)}>
                      <ListItemAvatar>
                      <Avatar sx={{scale: '80%', mb: -2.5, mt: 1}}>
                          <img src={carImage} style={{width: 50}}/>
                        </Avatar>
                        <p>{stop.boardTime.split(' ')[1].slice(0, stop.boardTime.split(' ')[1].indexOf(':', stop.boardTime.split(' ')[1].indexOf(':') + 1))}</p>
                      </ListItemAvatar>
                      <ListItemText primary={`${stop.name}`} secondary={`${stop.passengers.length} ${stop.passengers.length > 1 ? "groups" : "group"}`}
 />
                    </ListItem>
                  )})
                }
              </List>
            </Box>
            <Modal
              aria-labelledby="unstyled-modal-title"
              aria-describedby="unstyled-modal-description"
              open={open}
              onClose={handleClose}
              slots={{ backdrop: StyledBackdrop }}
            >
              <ModalContent sx={{ width: 400 }}>
                <p id="unstyled-modal-description" className="modal-description">
                  {modalAddress}
                </p>
                {passengers.map((passenger, idx) => {
                  return (
                    <Typography key={idx}>
                      {passenger.count} {passenger.count > 1 ? "people" : "person"}
                    </Typography>
                  )
                })}
              </ModalContent>
            </Modal>
            <Button            
              variant="contained"
              fullWidth
              sx={{
                backgroundColor : "secondary.main",
                textTransform : "none",
                mb: 2, mt: 5,
                height: 40,
              }}
              onClick={toDriverEndJourney}
            >
              End Journey
            </Button>
          </Container>
        </Container>
    </>
  )
}

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);