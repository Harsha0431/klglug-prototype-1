import React , {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ValidateUser} from '../../services/ValidateUserCredentials';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../OtherComponents/AlertMessageError';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const [idError , setIdError] = useState(false);
  const [passwordError , setPasswordError] = useState(false);
  const navigate = useNavigate();
  const [showAlertMessage , setShowAlertErrorMessage] = useState(false) ;
  const [alertMessage , setAlertMessage] = useState('');
    
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    if(password==='' || email===''){
      if(password==='' && email ===''){
        setIdError(true);
        setPasswordError(true);
      }
      else if(email===''){
        setIdError(true);
      }
      else if(password===''){
        setPasswordError(true);
      }
      
    }
    else{
      setIdError(false);
      setPasswordError(false);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      const response = await ValidateUser({id:email , password:password});
            if(response.status === 1){
              localStorage.setItem("loginToken" , response.token);
              alert("Token : " + response.token)
              console.log(localStorage.getItem('loginToken'));
                if(response.role=="admin")
                    navigate('/admin');
            }
            else if(response.status === 10){
                setShowAlertErrorMessage(true);
                setAlertMessage('Invalid Login Credentials');
                setTimeout(()=>{} , 500);
                await new Promise((resolver)=>setTimeout(resolver , 3000));
                setShowAlertErrorMessage(false);
                setAlertMessage('');
                // setOpenBackdrop(true);
            }
    }
  };

  useEffect(()=>{
    console.log("From LS : " + localStorage.getItem('loginToken'));
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      {showAlertMessage && <AlertMessage message={alertMessage}/>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              helperText={idError?'Username Required':''}
              error={idError}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={()=>setIdError(false)}
            />
            <TextField
              helperText={passwordError?'Password Required':''}
              error={passwordError}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={()=>setPasswordError(false)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="\signUp" variant="body2">
                  {"First time login? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}