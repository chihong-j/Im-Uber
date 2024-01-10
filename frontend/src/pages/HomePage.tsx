import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';

export const HomePage = () => {
  const navigate = useNavigate()
  // const {state} = useLocation();
  // const { isDriver, name } = state;
  const toProfile = () => {
    // navigate('/profile', { state: { isDriver: false, name: 'Joey' }})
    navigate('/profile')
  }
  const logOut = () => {
    navigate('/')
  }

  return (
    <>
      <h1>
        {/* {name} */}
      </h1>
      <div>
        <Button variant="contained" onClick={toProfile}>Profile</Button>
        <Button variant="contained" onClick={logOut}>Log out</Button>
      </div>
    </>
  );
}