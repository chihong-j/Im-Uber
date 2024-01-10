import { useState, useRef, RefObject } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import { brandList } from '../../../models/carBrand';
import { carColor } from '../../../models/carColor';
import { useUserContext } from '../../../contexts/UserContext';
import { infoBarType } from '../../../models/user.model';
import { updateCarInfo, updateDriverInfo } from '../../../apis/user.api';

const MidButton = styled(Button)({
  textTransform: 'none',
  fontSize: "14px",
  height: "40px",
  width: "275px",
  background: "#9C694C",
});

type CarProps = {
  setInfoBar: (infoBar: infoBarType) => void;
}

export const Car = (props: CarProps) => {
  const { setInfoBar } = props;
  const [ edit, setEdit ] = useState<boolean>(false);
  const { user, setUser, setProfileStatus } = useUserContext();
  console.log(user);
  const refs: { [key:string]: RefObject<HTMLDivElement> } = {
    brand: useRef<HTMLDivElement>(null),
    type: useRef<HTMLDivElement>(null),
    seat: useRef<HTMLDivElement>(null),
    license: useRef<HTMLDivElement>(null),
    color: useRef<HTMLDivElement>(null)
  }
  const textMap = [
    {id: "brand", label: "Brand", user: (user === null || user.car === null)? null : user.car.brand},
    {id: "type", label: "Type", user: (user === null || user.car === null)? null : user.car.type},
    {id: "seat", label: "Number of seats", user: (user === null || user.car === null)? null : user.car.seat},
    {id: "license", label: "License plate", user: (user === null || user.car === null)? null : user.car.carPlate},
    {id: "color", label: "Color", user: (user == null || user.car === null)? null : user.car.color}
  ]

  const Text = styled(TextField)({
    width: "275px",
    paddingBottom: "10px",
    input: {
      color: "#000000",
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

  const alertStyle = {
    display: (user != null && user.driver)? "none" : "flex",
    marginBottom: "10px",
  }

  const editClick = async () => {
    if(edit){
      const brand = refs["brand"].current?.getElementsByTagName("input")[0].value;
      const type = refs["type"].current?.getElementsByTagName("input")[0].value;
      const seat = refs["seat"].current?.getElementsByTagName("input")[0].value;
      const license = refs["license"].current?.getElementsByTagName("input")[0].value;
      const color = refs["color"].current?.getElementsByTagName("input")[0].value;
      if(brand === "" && type === "" && seat === "" && license === "" && color === ""){
      }else if(brand !== "" && type !== "" && seat !== "" && license !== "" && color != ""){
        if(user === null){
          setInfoBar({open: true, type: "error", message: "Please sign in first."});
        }else{
          const newUser = {
            ...user,
            driver: true,
            car: {
              ...user.car,
              brand: brandList.findIndex((i) => i === brand) ?? user.car.brand,
              type: type ?? user.car.type,
              seat: Number(seat) ?? user.car.seat,
              carPlate: license ?? user.car.carPlate,
              color: carColor.findIndex((i) => i === color) ?? user.car.color
            }
          }
          try{
            const response = await updateDriverInfo(newUser);
            setInfoBar({open: true, type: "success", message: response.message});
            setUser(newUser);
          }catch(error: any){
            if(error.response.data.error === "Please specify carPlate"){

            }
            setInfoBar({open: true, type: "error", message: error.response.data.error});
          }
        }
      }else{
        setInfoBar({open: true, type: "error", message: "All fields need to be filled."});
      }
    }
    setEdit(!edit);
  }

  return (
    <>
      <Alert severity="error" style={alertStyle}>Please fill in below informations to become a driver.</Alert>
      {textMap.map(({ id, label, user }) => (
        (id === "brand")?
        <Text
          select
          id={id}
          label={label}
          defaultValue={(user === null)? null : brandList[Number(user)]}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        >
          {brandList.map((option, i) => (
            <MenuItem id={i.toString()} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Text>
        :
        (id === "type")?
        <Text
          select
          id={id}
          label={label}
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        >
          <MenuItem key={"SUV"} value={"SUV"}>SUV</MenuItem>
          <MenuItem key={"Sedan"} value={"Sedan"}>Sedan</MenuItem>
        </Text>
        :
        (id === "color")?
        <Text
          select
          id={id}
          label={label}
          defaultValue={(user === null)? null : carColor[Number(user)]}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        >
          {carColor.map((option, i) => (
            <MenuItem id={i.toString()} key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Text>
        :
        (id === "seat")?
        <Text
          key={id}
          id={id}
          label={label}
          type="number"
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={{...inputProps, inputProps: {min: 0, max: 6}}}
        />
        :
        <Text
          key={id}
          id={id}
          label={label}
          type="text"
          defaultValue={user}
          ref={refs[id]}
          variant="standard"
          InputProps={inputProps}
        />
      ))}
      <MidButton variant="contained" onClick={() => editClick()} style={editStyle}>{(edit)? "Update" : "Edit"}</MidButton>
      <MidButton variant="contained" onClick={() => setProfileStatus(["home", ""])}>Back</MidButton>
    </>
  );
}