import * as React from 'react';
import { useState } from 'react';
import { SignIn } from "../components/sign/SignIn";
import { SignUp } from "../components/sign/SignUp";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#313944'
    },
    secondary: {
      main: '#9C694C'
    }
  }
});

const Div = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  color: '#9C694C',
}));

export const SignInPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("None")

  return (
    <> 
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '95vh',
          }}
        >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              border: "solid",
              borderColor: "#e0e0e0",
              borderRadius: "10px",
              ml: 3,
              mr: 3,
              pt: "10px",
              pl: "20px",
              pr: "20px",
            }}
          >
            <Div>
              I'm Uber
            </Div>
            {isSignIn === true && <SignIn setIsSignIn={setIsSignIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
            {isSignIn === false && <SignUp setIsSignIn={setIsSignIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Box>
        </Container>
        </div>
      </ThemeProvider>
    </>
  );
}