import * as React from 'react';
import { useState } from 'react';
import { signUp } from "../../apis/sign.api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { userSignUp } from '../../models/user.model';

interface UserData {
    userName: string;
    email: string;
    phone: string;
    password: string;
    addressHome: string;
    addressCompany: string;
    passwordConfirm: string;
    gender: string;
}

type UserDataFiltered = Omit<UserData, "passwordConfirm">;

type SignUpProps = {
    errorMessage: string;

    setErrorMessage: (message: string) => void;
    setIsSignIn: (status: boolean) => void;
}

export const SignUp = (props: SignUpProps) => {
    const { setIsSignIn, errorMessage, setErrorMessage } = props;
    const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserData>({
        userName: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        addressHome: "",
        addressCompany: "",
        passwordConfirm: "",
    });

    const fieldLabels: { [key: string]: string } = {
        userName: 'User Name',
        email: 'Email',
        phone: 'Phone Number',
        password: 'Password',
        gender: 'Gender',
        addressHome: 'Home Address',
        addressCompany: 'Company Address',
        passwordConfirm: 'Password Confirmation',
    };

    const toSignIn = () => {
        setErrorMessage('None');
        setIsSignIn(true);
    };

    const handleInputChange = (field: keyof UserData, value: string | boolean) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: value,
        }));
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isValidPhoneNumber = (phoneNumber: string) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }
    const isValidPassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    
    const handleRegister = async () => {
        const missingFields = Object.keys(userData).filter((field) => userData[field as keyof typeof userData] === '');
        if (missingFields.length > 0) {
            const missingFieldLabels = missingFields.map((field) => fieldLabels[field]).join(', ');
            if (missingFields.length === 1)
                setErrorMessage(`Please fill in the following required field: ${missingFieldLabels}`);
            else
                setErrorMessage(`Please fill in the following required fields: ${missingFieldLabels}`);
            return;
        }
        if (userData.userName.length < 4) {
            setErrorMessage('User Name must be at least 4 characters');
            return;
        }
        if (!isValidEmail(userData.email)) {
            setErrorMessage('Invalid Email');
            return;
        }
        if (!isValidPhoneNumber(userData.phone)) {
            setErrorMessage('Invalid Phone Number');
            return;
        }
        if (userData.addressHome === userData.addressCompany) {
            setErrorMessage('Home Address and Company Address cannot be the same');
            return;
        }
        if (!isValidPassword(userData.password)) {
            setErrorMessage('Invalid Password: It should be at least 8 characters long and contain at least one letter and one number');
            return;
        }
        if (userData.password !== userData.passwordConfirm) {
            setErrorMessage('Password and Confirm Password do not match');
            return;
        }
        
        const userDataFiltered: UserDataFiltered = Object.fromEntries(
            Object.entries(userData)
              .filter(([key]) => key !== "passwordConfirm")
              .map(([key, value]) => [key, value])
          ) as UserDataFiltered;

        const signUpData: userSignUp = { ...userDataFiltered, isDriver: false, carPlate: "", seat: 0, brand: 0, color: 0, electric: false, type: "SUV" };
        
        try {
            const response = await signUp(signUpData);
            setErrorMessage('None');
            setIsSignIn(true);
        }
        catch (error: any) {
            if (error.response.status === 409) {
                setErrorMessage("User already exists");
            }
            return;
        }
    };

    return (
        <>
            <Typography component="h1" variant="h6" color="primary">
                Sign Up
            </Typography>
            <Box sx={{ mt: 1 }}>
                {isFirstPage ? (
                    <>
                        User Name (At least 4 characters)
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            value={userData.userName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('userName', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                            autoFocus
                        />
                        Email
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={userData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Phone Number
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone"
                            value={userData.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Gender
                        <RadioGroup
                            row
                            name="gender"
                            value={userData.gender}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('gender', e.target.value)}
                        >
                            <FormControlLabel value="M" control={<Radio size="small" />} label="Male" />
                            <FormControlLabel value="F" control={<Radio size="small" />} label="Female" />
                            <FormControlLabel value="O" control={<Radio size="small" />} label="Other" />
                        </RadioGroup>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mb: 1, mt: 1 }}
                            onClick={()=>setIsFirstPage(false)}
                        >
                            Continue
                        </Button>
                    </>
                ) : (
                    <>
                        Home Address
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="home"
                            label="Home Address"
                            name="home"
                            autoComplete="home"
                            value={userData.addressHome}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('addressHome', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                            autoFocus
                        />
                        Company Address
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="company"
                            label="Company Address"
                            name="company"
                            autoComplete="company"
                            value={userData.addressCompany}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('addressCompany', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Password
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password Confirmation"
                            type="password"
                            id="password"
                            value={userData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('password', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        Confirm your Password
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirm"
                            label="Password"
                            type="password"
                            id="passwordConfirm"
                            value={userData.passwordConfirm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('passwordConfirm', e.target.value)}
                            sx={{ mb: 1.5, mt: 1 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mb: 1, mt: 1 }}
                            onClick={()=>setIsFirstPage(true)}
                        >
                            Back
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mb: 1, mt: 1 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </>
                )}
                <Grid container>
                    <Grid item>
                        <p>
                            {"Already have an Account? "}
                            <b onClick={toSignIn}>Login</b>
                        </p>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Typography sx={{ marginTop: 1,marginBottom: 2, color: errorMessage === "None" ? "white" : "error.main" }} >
                        {errorMessage}                            
                    </Typography>
                </Grid>
            </Box>
        </>
    );
}