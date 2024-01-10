import { useState, useRef, RefObject } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useUserContext } from '../../../contexts/UserContext';
import { infoBarType } from '../../../models/user.model';
import { updatePassengerFav } from '../../../apis/user.api';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type PassengerRouteProps = {
  setInfoBar: (infoBar: infoBarType) => void;
}

export const PassengerRoute = (props: PassengerRouteProps) => {
  const { setInfoBar } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const { user, setUser, setProfileStatus } = useUserContext();
  console.log(user);
  const goRefs: { [key:string]: RefObject<HTMLDivElement> } = {
    start: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  };
  const backRefs: { [key:string]: RefObject<HTMLDivElement> } = {
    destination: useRef<HTMLDivElement>(null),
    time: useRef<HTMLDivElement>(null),
    people: useRef<HTMLDivElement>(null),
  };

  const Text = styled(TextField)({
    width: "275px",
    paddingBottom: "10px",
    label: {
      color: (edit)? "#313944" : "darkgrey",
      fontWeight: "bold",
    },
  })

  const inputProps = {
    disabled: !edit,
    style: {
      fontSize: "14px",
    },
  }

  const editStyle = {
    background: "#313944",
    marginTop: "10px",
    marginBottom: "5px",
  }

  const editClick = async () => {
    if(edit){
      if(user !== null){
        const newUser = {
          ...user,
          favRoute: {
            passenger: {
              GO: {
                address: goRefs["start"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.GO.address,
                boardTime: goRefs["time"].current?.getElementsByTagName("input")[0].value + ":00" ?? user.favRoute.passenger.GO.boardTime,
                passengerCnt: Number(goRefs["people"].current?.getElementsByTagName("input")[0].value) ?? user.favRoute.passenger.GO.passengerCnt,
              },
              BACK: {
                address: backRefs["destination"].current?.getElementsByTagName("input")[0].value ?? user.favRoute.passenger.BACK.address,
                boardTime: backRefs["time"].current?.getElementsByTagName("input")[0].value + ":00" ?? user.favRoute.passenger.BACK.boardTime,
                passengerCnt: Number(backRefs["people"].current?.getElementsByTagName("input")[0].value) ?? user.favRoute.passenger.BACK.passengerCnt,
              }
            },
            driver: {...user.favRoute.driver}
          }
        };
        try{
          const response = await updatePassengerFav(newUser);
          setUser(newUser);
          setInfoBar({open: true, type: "success", message: response.message});
        }catch(error: any){
          setInfoBar({open: true, type: "error", message: error.response.data.error});
        }
      }
    }
    setEdit(!edit);
  }

  return (
    <>
      <div style={{fontWeight: "bold"}}>Go to work</div>
      <Text
        id="start"
        label="Start"
        defaultValue={(user === null)? null : user.favRoute.passenger.GO.address}
        ref={goRefs["start"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null)? null : user.favRoute.passenger.GO.boardTime}
        ref={goRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="people"
        label="Number of people"
        type="number"
        defaultValue={(user === null)? null : user.favRoute.passenger.GO.passengerCnt}
        ref={goRefs["people"]}
        variant="standard"
        InputProps={{...inputProps, inputProps: {min: 0, max: 6}}}
      />
      <Divider color="#313944" sx={{marginBottom: "15px", marginTop: "10px", padding: "1px"}}/>
      <div style={{fontWeight: "bold"}}>Back to home</div>
      <Text
        id="destination"
        label="Destination"
        defaultValue={(user === null)? null : user.favRoute.passenger.BACK.address}
        ref={backRefs["destination"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="time"
        label="Time"
        type="time"
        defaultValue={(user === null)? null : user.favRoute.passenger.BACK.boardTime}
        ref={backRefs["time"]}
        variant="standard"
        InputProps={inputProps}
      />
      <Text
        id="people"
        label="Number of people"
        type="number"
        defaultValue={(user === null)? null : user.favRoute.passenger.BACK.passengerCnt}
        ref={backRefs["people"]}
        variant="standard"
        InputProps={{...inputProps, inputProps: {min: 0, max: 6}}}
      />
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setProfileStatus(["home", ""])}>Back</MidButton>
    </>
  );
}