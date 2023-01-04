import React, { useState, useEffect } from 'react';
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
import Header from '../components/header/Header'


const theme = createTheme();

export default function SignUpSide() {
  const {isAuthenticated} =  React.useContext(AuthContext)
  const [userNamevalue] = React.useState(window.localStorage.getItem("userName"));
  const [firstNamevalue] = React.useState(window.localStorage.getItem("firstname"));
  const [lastNamevalue] = React.useState(window.localStorage.getItem("lastname"));
  const [emailValue] = React.useState(window.localStorage.getItem("email"));
  const [id] = React.useState(window.localStorage.getItem("id"));


  const [profil,setProfil]=useState({
    username:   `${userNamevalue}`,
    firstname: `${firstNamevalue}`,
    lastname: `${lastNamevalue}`,
    email: `${emailValue}`,
  }) 
  const [emailChange,setemailChange]=useState({
    email: `${emailValue}`,
  }) 
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  useEffect(() => {

          setIsLoading(false)
     
    
  },[])


  const handlChange=({currentTarget})=>{
    const {value, name} = currentTarget
    setProfil({
      ...profil,
      [name]:value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try { 
      await authAPI.profilUser(profil,id)
    }catch(error) {
      console.log(error);
    }

  };

  return (
    <ThemeProvider theme={theme}> 
    <Header/>
  
     {isLoading && isAuthenticated ? 'loading..' :    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
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
              Profile
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="username"
                  type="username"
                  id="username"
                  defaultValue={userNamevalue}
                  onChange={handlChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  defaultValue={firstNamevalue}
                  id="firstname"
                  onChange={handlChange}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  defaultValue={lastNamevalue}
                  label="Last Name"
                  name="lastname"
                  onChange={handlChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  defaultValue={emailValue}
                  onChange={handlChange}
                  autoComplete="email"
                />
                <TextField
                  required
                  fullWidth
                  id="adress"
                  label="Email Address"
                  name="email"
                  defaultValue={emailValue}
                  onChange={handlChange}
                  autoComplete="email"
                />
              </Grid>
              
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enregistrer les modifications
            </Button>
            
          </Box>
          </Box>
        </Grid>
      </Grid>
    }
    </ThemeProvider>
  );
}