import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../context/authContext';

function Copyright(props) {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function SignInSide() {
  const {setIsAuthenticated} = React.useContext(AuthContext)
  const [error, setError] = useState(AuthContext)

  const [credential,setCredential]=useState({
    identifier: "",
    password: ""
  }) 
  const handlChange=({currentTarget})=>{

    const {value, name} = currentTarget
    setCredential({
      ...credential,
      [name]:value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    
    try { 
      await authAPI.authentification(credential)
      setIsAuthenticated(true)

     
    }catch(error) {
      
        setError(error.code)
        console.log(error);   
        
    }

  };

  return (
    <ThemeProvider theme={theme}>
            
            
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />       

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form"  onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="identifier"
                label="username"
                name="identifier"
                autoComplete="email"
                autoFocus
                onChange={handlChange}
              />
              <TextField
                margin="normal"
                required
                
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlChange}
                autoComplete="current-password"
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
                  <Link href="#" variant="body2" >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/inscription" variant="body2">
                    {"Vous n'avez pas de compte ? Inscrivez-vous !"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}