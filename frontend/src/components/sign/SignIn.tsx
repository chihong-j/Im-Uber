import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { signIn } from "../../apis/sign.api";
import { getUserInfo} from "../../apis/user.api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { userSignIn } from "../../models/user.model";
import { useUserContext } from '../../contexts/UserContext';

type SignInProps = {
    errorMessage: string;

    setErrorMessage: (message: string) => void;
    setIsSignIn: (status: boolean) => void;
}

export const SignIn = (props: SignInProps) => {
    const { setIsSignIn, errorMessage, setErrorMessage } = props;
    const { user, setUser } = useUserContext();
    const navigate = useNavigate()

    const toSignUp = () => {
        setErrorMessage("None");
        setIsSignIn(false);
    }

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string;
        const password = data.get('password') as string;
        const requiredFields = [
            { field: 'User Name', value: username },
            { field: 'Password', value: password },
        ];
        const userData: userSignIn = {
            userName: username,
            password: password
        }

        const missingFields = requiredFields.filter(({ value }) => value === '');
        if (missingFields.length > 0) {
            const missingFieldLabels = missingFields.map(({ field }) => field).join(', ');
            if (missingFields.length === 1)
                setErrorMessage(`Please fill in the following required field: ${missingFieldLabels}`);
            else
                setErrorMessage(`Please fill in the following required fields: ${missingFieldLabels}`);
            return;
        }

        try {
            const response = await signIn(userData);
            const userInfo = await getUserInfo();
            setUser(userInfo);
            setErrorMessage("None");
            navigate('/passengerHome');
        } 
        catch (error: any) {
            if (error.response.status === 401) {
                if (error.response.data.error === "User does not exist") {
                    setErrorMessage("User not found, please sign up first");
                }
                else if (error.response.data.error === "Incorrect password") {
                    setErrorMessage("Incorrect password");
                }
            }
            return;
        }
    };

    return (
        <>
            <Typography component="h1" variant="h6" color="primary">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
                User Name
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="username"
                    sx={{ mb: 1.5, mt: 1 }}
                    autoFocus
                />
                Password
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mb: 1.5, mt: 1 }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mb: 1, mt: 1 }}
                >
                    Login
                </Button>
                <Grid container>
                    <Grid item>
                        <p>
                            {"Don't have an account? "}
                            <b onClick={toSignUp}>Register</b>
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