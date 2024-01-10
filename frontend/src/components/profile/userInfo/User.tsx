import { useState, useRef, RefObject, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useUserContext } from '../../../contexts/UserContext';
import { infoBarType } from '../../../models/user.model';
import { updatePassengerInfo, cashTopUp, getUserInfo } from '../../../apis/user.api';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

const HalfButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "130px"
});

type UserProps = {
  setInfoBar: (infoBar: infoBarType) => void;
}

export const User = (props: UserProps) => {
  const { setInfoBar } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ topUp, setTopUp ] = useState<boolean>(false);
  const { user, setUser, setProfileStatus } = useUserContext();
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    home: useRef<HTMLDivElement>(null),
    company: useRef<HTMLDivElement>(null),
    wallet: useRef<HTMLDivElement>(null),
  }
  const genderMap = (s: string) => {
    if(s === "M") return "Male";
    else if(s === "F") return "Female";
    else if(s === "O") return "Other";
  }
  const textMap = [
    {id: "name", label: "User name", user: (user === null)? null : user.name},
    {id: "email", label: "Email", user: (user === null)? null : user.email},
    {id: "phone", label: "Phone number", user: (user === null)? null : user.phone},
    {id: "gender", label: "Gender", user: (user === null)? null : genderMap(user.gender)},
    {id: "home", label: "Home address", user: (user === null)? null : user.home},
    {id: "company", label: "Company address", user: (user === null)? null : user.company},
    {id: "wallet", label: "Wallet", user: (user === null)? null : user.wallet}
  ]

  const Text = styled(TextField)({
    width: "275px",
    paddingBottom: "10px",
    input: {
      color: "#000000",
    },
    '#wallet-label': {
      color: (topUp)? "#313944" : "darkgrey",
      fontWeight: "bold",
    },
    label: {
      color: (edit)? "#313944" : "darkgrey",
      fontWeight: "bold",
    },
    '& .MuiSelect-select.Mui-disabled': {
      color: "#000000",
    },
  })

  const inputProps = {
    style: {
      fontSize: "14px",
    },
  }

  useEffect( () => {
    async function updateUserInfo() {
      try{
        const response = await getUserInfo();
        console.log(response)
        setUser(response)
      }
      catch(error : any){
        console.log(error)
      }
    }
    updateUserInfo();
  }, [])

  const editClick = async () => {
    if(edit){
      if(user !== null){
        const newUser = {
          ...user,
          home: refs["home"].current?.getElementsByTagName("input")[0].value ?? user.home,
          company: refs["company"].current?.getElementsByTagName("input")[0].value ?? user.company,
        };
        try{
          const response = await updatePassengerInfo(user);
          setUser(newUser);
          setInfoBar({open: true, type: "success", message: response.message});
        }catch(error: any){
          setInfoBar({open: true, type: "error", message: error.response.data.error});
        }
      }
    }
    setEdit(!edit);
  }

  const topUpClick = async () => {
    if(topUp && user !== null){
      const cash = Number(refs["wallet"].current?.getElementsByTagName("input")[0].value);
      try{
        const response = await cashTopUp(cash);
        setUser({...user, wallet: response.balance});
        setInfoBar({open: true, type: "success", message: "Top up successfully."});
      }catch(error: any){
        setInfoBar({open: true, type: "error", message: error.response.data.error});
      }
    }
    setTopUp(!topUp);
  }

  return (
    <>
      {textMap.map(({ id, label, user }) => (
        (id === "wallet")?
        <Text
          key={id}
          id={id}
          label={label}
          type="number"
          defaultValue={user}
          variant="standard"
          disabled={true}
          InputProps={{...inputProps, startAdornment: <InputAdornment position="start">$</InputAdornment>}}
        />
        :
        <Text
          key={id}
          id={id}
          label={label}
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          disabled={(id === "name" || id === "email" || id === "phone" || id === "gender")? true : !edit}
          InputProps={inputProps}
        />
      ))}
      <Dialog open={topUp} onClose={() => setTopUp(false)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="topUpWallet"
            label="Money"
            helperText="Enter money you want to top up to your wallet"
            type="number"
            ref={refs["wallet"]}
            fullWidth
            variant="standard"
            InputLabelProps={{sx: {fontWeight: "bold"}}}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{textTransform: "none"}} onClick={() => topUpClick()}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <div style={{ width: "275px", display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '5px' }}>
        <HalfButton variant="contained" onClick={() => editClick()}>{(edit)? "Update" : "Edit"}</HalfButton>
        <HalfButton variant="contained" onClick={() => topUpClick()}>Top up</HalfButton>
      </div>
      <MidButton variant="contained" onClick={() => setProfileStatus(["home", ""])}>Back</MidButton>
    </>
  );
}